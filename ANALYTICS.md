# Inventory analytics

Uses the existing GA4 web stream G-LDDC1RZFHJ. No additional stream or main-site configuration is required.

## Automatic tracking and exclusions

The Google tag loads automatically on inventory.lucramarble.com. There is no consent prompt or preferences control, as requested by the site owner. Local previews and staff sessions are excluded. Opening sales sign-in excludes the current tab for the rest of its session. Existing signed-in staff are checked before startup.

The tag runs in an isolated same-origin frame so automatic measurement cannot inspect customer forms or shared-list links. Page location and title are fixed, and referrers contain only the referring origin. No names, contact details, notes, search terms, shared-list titles, or full URLs are passed to Google. Advertising consent stays denied and Google Signals is disabled. Google Analytics still uses its normal pseudonymous identifiers on tracked visits.

## Events

- page_view: canonical inventory page.
- view_bundle, save_bundle, remove_bundle, contact_whatsapp: public bundle code only.
- open_my_list, compare_bundles, open_quote: bundle count.
- quote_handoff: email/whatsapp channel and bundle count, following form validation; this measures a handoff, not a delivered enquiry.
- search_inventory: result count only.
- filter_material: fixed material category.
- filter_dimensions: minimum dimensions and result count.
- inventory_load_error, image_load_error: no URLs or error text.

Both parent and frame enforce the event and parameter allowlists.

## Verification and reporting

Open the live inventory page, and browse a bundle. In the existing GA4 property, check Reports > Realtime; filter page location or hostname to inventory.lucramarble.com to separate inventory from the main site. Standard reports may take longer to populate. Register bundle_code, category, and channel as event-scoped custom dimensions if detailed reports for these parameters are needed. Do not mark quote_handoff as a completed sale.

Automated tests cover sanitization, trusted-frame messaging, automatic startup/stop, and local exclusion. Browser checks verify live tag loading and staff exclusion. Receipt in Google Analytics reports requires access to the Google account and is a separate verification step.
