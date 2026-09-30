from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.pdfgen.canvas import Canvas


OUT = "output/pdf/lucra_stok_capraz_kontrol_raporu.pdf"

FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
pdfmetrics.registerFont(TTFont("Arial", FONT_REG))
pdfmetrics.registerFont(TTFont("Arial-Bold", FONT_BOLD))

NAVY = colors.HexColor("#14213D")
INK = colors.HexColor("#1F2937")
MUTED = colors.HexColor("#667085")
TEAL = colors.HexColor("#0F8B8D")
TEAL_LIGHT = colors.HexColor("#E7F5F5")
CORAL = colors.HexColor("#D95D39")
CORAL_LIGHT = colors.HexColor("#FCEDE8")
GOLD = colors.HexColor("#B98216")
GOLD_LIGHT = colors.HexColor("#FFF6DB")
LINE = colors.HexColor("#D7DEE8")
PALE = colors.HexColor("#F5F7FA")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="CoverTitle", fontName="Arial-Bold", fontSize=25, leading=29,
    textColor=NAVY, spaceAfter=5
))
styles.add(ParagraphStyle(
    name="CoverSub", fontName="Arial", fontSize=10.5, leading=15,
    textColor=MUTED, spaceAfter=13
))
styles.add(ParagraphStyle(
    name="H1x", fontName="Arial-Bold", fontSize=15, leading=19,
    textColor=NAVY, spaceBefore=3, spaceAfter=8
))
styles.add(ParagraphStyle(
    name="H2x", fontName="Arial-Bold", fontSize=11, leading=14,
    textColor=NAVY, spaceBefore=7, spaceAfter=5
))
styles.add(ParagraphStyle(
    name="Bodyx", fontName="Arial", fontSize=9.3, leading=13.2,
    textColor=INK, spaceAfter=5
))
styles.add(ParagraphStyle(
    name="Smallx", fontName="Arial", fontSize=8.2, leading=11,
    textColor=MUTED, spaceAfter=3
))
styles.add(ParagraphStyle(
    name="TableHead", fontName="Arial-Bold", fontSize=8.1, leading=9.5,
    textColor=colors.white, alignment=TA_LEFT
))
styles.add(ParagraphStyle(
    name="TableCell", fontName="Arial", fontSize=7.8, leading=9.3,
    textColor=INK
))
styles.add(ParagraphStyle(
    name="TableCellSmall", fontName="Arial", fontSize=7.1, leading=8.4,
    textColor=INK
))
styles.add(ParagraphStyle(
    name="KpiNumber", fontName="Arial-Bold", fontSize=18, leading=20,
    textColor=NAVY, alignment=TA_CENTER
))
styles.add(ParagraphStyle(
    name="KpiLabel", fontName="Arial", fontSize=7.8, leading=9.5,
    textColor=MUTED, alignment=TA_CENTER
))
styles.add(ParagraphStyle(
    name="Bulletx", fontName="Arial", fontSize=9.1, leading=13,
    leftIndent=12, firstLineIndent=-8, textColor=INK, spaceAfter=3
))


def P(text, style="Bodyx"):
    return Paragraph(text, styles[style])


def cell(text, small=False):
    return P(str(text), "TableCellSmall" if small else "TableCell")


def head(text):
    return P(text, "TableHead")


def bullet(text):
    return P("• " + text, "Bulletx")


def section(title, subtitle=None):
    parts = [P(title, "H1x")]
    if subtitle:
        parts.append(P(subtitle, "Smallx"))
    return parts


def styled_table(data, widths, header=True, font_size=None, row_bgs=None):
    t = Table(data, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
    ]
    if header:
        commands += [
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
            ("TOPPADDING", (0, 0), (-1, 0), 7),
        ]
    for idx in range(1 if header else 0, len(data)):
        bg = PALE if idx % 2 else colors.white
        if row_bgs and idx < len(row_bgs) and row_bgs[idx]:
            bg = row_bgs[idx]
        commands.append(("BACKGROUND", (0, idx), (-1, idx), bg))
    t.setStyle(TableStyle(commands))
    return t


def kpi(label, value):
    return [P(value, "KpiNumber"), P(label, "KpiLabel")]


def draw_page(canvas: Canvas, doc):
    canvas.saveState()
    w, h = landscape(A4)
    canvas.setFillColor(NAVY)
    canvas.rect(0, h - 8 * mm, w, 8 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(15 * mm, 14 * mm, w - 15 * mm, 14 * mm)
    canvas.setFont("Arial", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(15 * mm, 8 * mm, "LUCRA STOK - Çapraz kontrol raporu")
    canvas.drawRightString(w - 15 * mm, 8 * mm, f"Sayfa {doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(
    OUT, pagesize=landscape(A4),
    leftMargin=15 * mm, rightMargin=15 * mm,
    topMargin=17 * mm, bottomMargin=19 * mm,
    title="LUCRA STOK - Drive / Excel Çapraz Kontrol Raporu",
    author="OpenAI"
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="report", frames=frame, onPage=draw_page)])

story = []

# Page 1 - summary
story += [
    Spacer(1, 8 * mm),
    P("LUCRA STOK", "CoverTitle"),
    P("Drive / Excel capraz kontrol raporu", "H1x"),
    P("Hazırlanma tarihi: 4 Eylül 2026  |  Kaynak: LUCRA STOK.xlsx + canlı envanter ve bağlantılı Drive packing list dosyaları", "CoverSub"),
]

kpis = Table([
    [kpi("Drive bundle", "53"), kpi("Drive slab", "1.972"), kpi("Drive bilinen alan", "9.997,12 m²"), kpi("Packing list mevcut", "51 / 53")]
], colWidths=[doc.width / 4] * 4, rowHeights=[27 * mm])
kpis.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), TEAL_LIGHT),
    ("BACKGROUND", (1, 0), (1, 0), PALE),
    ("BACKGROUND", (2, 0), (2, 0), GOLD_LIGHT),
    ("BACKGROUND", (3, 0), (3, 0), CORAL_LIGHT),
    ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, colors.white),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
]))
story += [kpis, Spacer(1, 8 * mm)]

story += section("Yönetici özeti")
story += [
    bullet("Excel dosyası Drive'daki güncel envanterin birebir kopyası değil."),
    bullet("K2970, K6235, K6058, K5567, K6086, K3514 ve K5372 kodlarında adet, m², ölçü veya blok farkı var."),
    bullet("Drive'da bulunan 8 bundle Excel'de eksik: toplam 289 slab; 1.306,55 m² bilinen alan."),
    bullet("Excel'de Drive'da bulunmayan yaklaşık 537 slab / 2.865,51 m² stok bulunuyor."),
    bullet("DİĞER STOK toplam formülü son satırları kapsamıyor; görünen toplam gerçek veriden 129 slab / 596,71 m² düşük."),
]

story += section("Kaynak ve kapsam")
story += [
    P("Yerel dosya: <b>LUCRA STOK.xlsx</b>. Drive tarafında kullanılan kaynak, canlı <link href='https://inventory.lucramarble.com/' color='#0F8B8D'>Lucra Slab Inventory</link> sayfası ve kartlara bağlı packing list dosyalarıdır. Native <link href='https://docs.google.com/spreadsheets/d/1lFGJEq4HdPRkIaEM21D9fklqpeTC0ArEbZXsXL0nZ6c/edit' color='#0F8B8D'>Lucra Stock Database</link> dosyasında okunabilir hücre verisi bulunamamıştır.", "Bodyx"),
    P("Not: Drive toplamındaki m² değeri, alanı bilinen bundle'ların toplamıdır. K6222 ve K5372 için Drive tarafında alan bilgisi mevcut değildir.", "Smallx"),
]

story.append(PageBreak())

# Page 2 - critical discrepancies
story += section("Kritik adet, m², ölçü ve blok farkları", "Fark sütunu Excel - Drive olarak okunmalıdır.")
critical = [
    [head("Kod"), head("Drive"), head("Excel"), head("Fark")],
    [cell("K2970"), cell("9 slab / 51,53 m²"), cell("3 / 51,53"), cell("6 slab eksik; ilk blok adedi hatalı")],
    [cell("K6235"), cell("22 / 136,10"), cell("63 / 388,59"), cell("41 slab ve 252,49 m² fazla; Drive 2 blok, Excel 6 blok")],
    [cell("K6058"), cell("39 / 234,11"), cell("49 / 295,44"), cell("10 slab ve 61,33 m² fazla")],
    [cell("K5567"), cell("11 / 69,71"), cell("23 / 145,76"), cell("12 slab ve 76,05 m² fazla")],
    [cell("K6086"), cell("74 / 384,59"), cell("82 / 384,59"), cell("8 slab fazla; ilk ölçü Drive 175 x 296, Excel 195 x 325")],
    [cell("K3514"), cell("40 / 239,96"), cell("48 / 284,12"), cell("8 slab ve 44,16 m² fazla; ek ölçüler mevcut")],
    [cell("K5372"), cell("44 / m² bilinmiyor"), cell("45 / 148,96"), cell("Adet 1 farklı; Drive packing list ve m² bilgisi yok")],
]
story += [styled_table(critical, [28 * mm, 47 * mm, 47 * mm, 135 * mm], row_bgs=[None, CORAL_LIGHT, CORAL_LIGHT, CORAL_LIGHT, CORAL_LIGHT, GOLD_LIGHT, CORAL_LIGHT, GOLD_LIGHT]), Spacer(1, 6 * mm)]

story += section("Blok ve ölçü notları")
story += [
    bullet("K2970: Drive'da ilk blok satırı 7 adet; Excel'de aynı satır 1 adet yazılmış."),
    bullet("K6235: Drive'daki malzeme Arabescato Imperiale ve 2 blok; Excel'deki kayıt BELLA VİSTA ve 6 blok."),
    bullet("K6058: Excel'de Drive'da olmayan ek K60580202 satırı bulunuyor; ek miktar 10 slab / 61,33 m²."),
    bullet("K6086: Alan toplamı aynı olmasına rağmen adet 8 fazla ve ilk boyut farklı; veri kaydı yeniden kontrol edilmeli."),
    bullet("K3514: Excel'de 174 x 311, 170 x 311, 193 x 311, 161 x 311 ve 157 x 311 gibi Drive'da bulunmayan ölçüler var."),
]

story.append(PageBreak())

# Page 3 - missing and local-only
drive_heading = P("Drive'da olup Excel'de bulunmayan bundle'lar", "H2x")
drive_sub = P("Toplam: 289 slab; K6222 hariç bilinen alan 1.306,55 m².", "Smallx")
drive_only = [
    [head("Kod"), head("Malzeme"), head("Slab"), head("Bilinen m²")],
    [cell("K6029"), cell("Bruno Perla"), cell("37"), cell("172,91")],
    [cell("K6131"), cell("Crema Luna"), cell("59"), cell("339,65")],
    [cell("M2878"), cell("Diamond Grey"), cell("57"), cell("193,40")],
    [cell("L006"), cell("Porto Rosa"), cell("32"), cell("152,69")],
    [cell("K5094"), cell("Red Travertine"), cell("34"), cell("183,98")],
    [cell("K6222"), cell("Rosso Levanto"), cell("18"), cell("Bilinmiyor")],
    [cell("K6044"), cell("Terranova Ceppo"), cell("30"), cell("149,66")],
    [cell("K6130"), cell("Vanilla"), cell("22"), cell("114,26")],
]
drive_block = [drive_heading, drive_sub, styled_table(drive_only, [22 * mm, 52 * mm, 18 * mm, 30 * mm], row_bgs=[None] + [TEAL_LIGHT] * 8)]

local_heading = P("Excel'de olup Drive'da bulunmayan stoklar", "H2x")
local_sub = P("Yaklaşık toplam: 537 slab / 2.865,51 m².", "Smallx")
local_only = [
    [head("Kod"), head("Malzeme"), head("Slab"), head("m²")],
    [cell("K3854"), cell("Luce Marrone"), cell("9"), cell("51,45")],
    [cell("K3489"), cell("Flinders White"), cell("21"), cell("115,45")],
    [cell("K5808"), cell("Karmania Traonyx"), cell("20"), cell("120,76")],
    [cell("K4243"), cell("Silver Roots"), cell("20"), cell("120,34")],
    [cell("K6192"), cell("Beige Spider"), cell("57"), cell("332,58")],
    [cell("K6189"), cell("Viola"), cell("54"), cell("306,53")],
    [cell("K6210"), cell("TRA ONYX"), cell("60"), cell("333,33")],
    [cell("K6293"), cell("VOLOCAS"), cell("68"), cell("307,12")],
    [cell("K6170"), cell("NİMBUS"), cell("71"), cell("330,87")],
    [cell("K6190..."), cell("Traverten Vein Cut"), cell("76"), cell("367,19")],
    [cell("K5698"), cell("Rosso Venato"), cell("56"), cell("368,17")],
    [cell("L0080"), cell("Nimbus White"), cell("25"), cell("111,72")],
]
local_block = [local_heading, local_sub, styled_table(local_only, [22 * mm, 52 * mm, 18 * mm, 30 * mm], row_bgs=[None] + [GOLD_LIGHT] * 12), Spacer(1, 2 * mm), P("Not: K6190... kaydı Excel'de K6155 blok alanının altında tutuluyor.", "Smallx")]

side_by_side = Table([[drive_block, local_block]], colWidths=[doc.width / 2 - 3 * mm, doc.width / 2 - 3 * mm])
side_by_side.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
]))
story += [side_by_side]

story.append(PageBreak())

# Page 4 - naming and workbook quality
story += section("Malzeme adı ve veri kalitesi farkları")
names = [
    [head("Kod"), head("Drive adı"), head("Excel adı"), head("Değerlendirme")],
    [cell("K6235"), cell("Arabescato Imperiale"), cell("BELLA VİSTA"), cell("Malzeme adı ve miktar farklı")],
    [cell("K5301"), cell("Silver Travertine Ham (Raw)"), cell("Silver Vein Cut"), cell("Adet / alan aynı; isim farklı")],
    [cell("K6169"), cell("Nimbus White Veincut"), cell("Boş"), cell("Malzeme adı eksik")],
    [cell("K1312"), cell("Tundra Grey"), cell("Tundra Grey Light"), cell("Adet / alan aynı; isim farklı")],
    [cell("K900"), cell("Tundra Grey Brushed"), cell("Tundra Grey"), cell("Brushed bilgisi Excel process alanında")],
    [cell("K6138 / K6139"), cell("Tundra Light"), cell("Tundra Grey"), cell("Adet / alan aynı; isim farklı")],
    [cell("K6164"), cell("Tundra Ocean"), cell("Tundra Grey"), cell("Adet / alan aynı; isim farklı")],
    [cell("K3619"), cell("Lilac Extra"), cell("Lilac"), cell("İsim farklı")],
    [cell("L1011"), cell("Bianco Dolomite"), cell("Bianco Dlomite"), cell("Excel'de yazım hatası")],
    [cell("L009"), cell("Nebula Wave / Travertine"), cell("L1009 / L0090"), cell("Kodların ayrı tutulması gerekir")],
    [cell("K3561"), cell("Sunset Dlomite"), cell("Sunset Dolomite"), cell("Drive tarafında yazım hatası")],
]
story += [styled_table(names, [38 * mm, 78 * mm, 65 * mm, 90 * mm], row_bgs=[None] + [PALE, PALE, GOLD_LIGHT, PALE, PALE, PALE, PALE, PALE, PALE, CORAL_LIGHT, GOLD_LIGHT, GOLD_LIGHT]), Spacer(1, 7 * mm)]

story += section("Excel dosyası içindeki kontrol notları")
story += [
    bullet("DİĞER STOK toplam formülleri I5:I104, J5:J104 ve K5:K104 aralığında bitiyor. 105-122. satırlar toplam dışında kalmış."),
    bullet("DİĞER STOK görünen toplam 533 slab / 2.858,4284 m²; tüm veri satırlarının doğru toplamı 662 slab / 3.455,1384 m²."),
    bullet("DİĞER STOK'ta Bundle Sqm toplamı 2.869,068 m², slab alanı toplamı ise 2.858,4284 m²; arada 10,6396 m² fark var."),
    bullet("K3653 için Excel Bundle Sqm 57,46 m² yazıyor; slab alanı ve Drive değeri yaklaşık 46,82 m²."),
]

story += section("Sonuç ve önerilen aksiyonlar")
story += [
    bullet("Öncelikle K6235, K6058, K5567, K6086 ve K3514 packing listleri ile Excel satırları yeniden eşleştirilmeli."),
    bullet("Drive'da olup Excel'de bulunmayan 8 bundle Excel'e eklenmeli; Excel-only stokların aktif / eski kayıt olup olmadığı teyit edilmeli."),
    bullet("Malzeme adları, kodlar ve block number alanları tek bir standartta birleştirilmeli."),
    bullet("DİĞER STOK toplam formülleri son veri satırlarını kapsayacak şekilde güncellenmeli."),
]

doc.build(story)
print(OUT)
