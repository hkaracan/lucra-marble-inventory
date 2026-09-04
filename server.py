#!/usr/bin/env python3
from __future__ import annotations

import json
import mimetypes
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from sync_drive import ROOT_FOLDER_ID, fetch, sync_inventory

ROOT = Path(__file__).parent
CACHE = ROOT / "cache" / "images"
CACHE.mkdir(parents=True, exist_ok=True)
SYNC_LOCK = threading.Lock()
MEDIA_SEMAPHORE = threading.BoundedSemaphore(3)
LAST_SYNC_FINISHED = 0.0
SYNC_COOLDOWN_SECONDS = 60


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        global LAST_SYNC_FINISHED
        if self.path != "/api/sync":
            self.send_error(404)
            return
        if not SYNC_LOCK.acquire(blocking=False):
            self.send_json({"ok": False, "error": "A Drive sync is already running."}, 409)
            return
        remaining = SYNC_COOLDOWN_SECONDS - (time.monotonic() - LAST_SYNC_FINISHED)
        if LAST_SYNC_FINISHED and remaining > 0:
            SYNC_LOCK.release()
            self.send_json({"ok": False, "error": f"Please wait {int(remaining) + 1} seconds before syncing again."}, 429)
            return
        try:
            payload = sync_inventory(ROOT_FOLDER_ID)
            self.send_json(
                {
                    "ok": True,
                    "count": len(payload["products"]),
                    "errors": payload.get("errors", []),
                    "warnings": payload.get("warnings", []),
                    "syncedAt": payload["syncedAt"],
                }
            )
        except Exception as exc:
            self.send_json({"ok": False, "error": str(exc)}, 500)
        finally:
            LAST_SYNC_FINISHED = time.monotonic()
            SYNC_LOCK.release()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/media":
            file_id = parse_qs(parsed.query).get("id", [""])[0]
            if not file_id or not all(char.isalnum() or char in "-_" for char in file_id):
                self.send_error(400)
                return
            try:
                cache_file = CACHE / f"v2-{file_id}.jpg"
                if cache_file.exists() and cache_file.stat().st_size:
                    content = cache_file.read_bytes()
                else:
                    with MEDIA_SEMAPHORE:
                        content = fetch(f"https://drive.google.com/thumbnail?id={file_id}&sz=w1400", timeout=45)
                    temporary = cache_file.with_suffix(".tmp")
                    temporary.write_bytes(content)
                    temporary.replace(cache_file)
            except Exception as exc:
                self.send_error(502, str(exc))
                return
            try:
                self.send_response(200)
                self.send_header("Content-Type", "image/jpeg")
                self.send_header("Cache-Control", "public, max-age=3600")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
            except (BrokenPipeError, ConnectionResetError):
                pass
            return
        super().do_GET()


if __name__ == "__main__":
    mimetypes.add_type("application/json", ".json")
    print("Lucra Inventory running at http://localhost:4173")
    ThreadingHTTPServer(("0.0.0.0", 4173), Handler).serve_forever()
