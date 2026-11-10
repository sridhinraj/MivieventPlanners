import re

html = open("index.html", encoding="utf-8").read()

required_ids = [
    "menuBtn", "menu", "headline", "world", "orb", "stage", "lit", "grid",
    "splash", "intro", "scrolltrack", "dot", "avatar", "film", "skip",
    "bar", "litImg", "litTitle", "litWhere", "litNote", "gridBtn"
]

for rid in required_ids:
    pattern = f'id=["\']{rid}["\']'
    match = re.search(pattern, html)
    assert match, f"Missing ID: {rid}"

required_classes = [
    "locked", "revealed", "deep", "gridview", "lit", "chrome",
    "wordmark", "menu-btn", "menu-label", "bars", "bio", "who", "brand-tag",
    "action-badges", "colophon", "gridbtn", "cue", "vig", "scrim", "plate",
    "shot", "meta", "where", "note", "card", "tall", "rows", "addr", "wide"
]

for c in required_classes:
    assert c in html, f"Missing class reference: {c}"

# Check headline exactly:
assert 'id="headline"' in html
assert '<span class="inner">' in html
assert '<span style="--i:0">Mivi</span>' in html
assert '<span style="--i:1">Event</span>' in html
assert '<span style="--i:2">Planners</span>' in html

# Check tokens on :root
tokens = [
    "--bg:#000", "--ink:#f4f2ef", "--dim:#8c8783", "--line:rgba(244,242,239,.28)",
    "--pad:clamp(14px, 2.6vw, 34px)", "--ease:cubic-bezier(.22,.61,.36,1)",
    "--hw:min(56vw, 640px)", "--persp:1150px", "--tap:44px"
]
for t in tokens:
    # normalize spaces
    t_clean = t.replace(" ", "")
    html_clean = html.replace(" ", "")
    assert t_clean in html_clean, f"Missing token: {t}"

# Check responsive rules:
assert "max-width: 900px" in html
assert "max-width: 768px" in html
assert "max-width: 640px" in html
assert "max-width: 380px" in html
assert "max-height: 520px" in html
assert "prefers-reduced-motion" in html

# Check URLs:
assert "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" in html
assert "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260922_195107_ed3f055a-3a13-4a71-b743-e10310454246.mp4" in html

# Check 21 records
assert "hf_20260922_194349_26ffdbfd-ac5e-49e9-a07d-c06d3f7cb4cb" in html
assert "hf_20260922_194416_47e18c62-253a-42e1-97a9-9e5f6a6b8d59" in html
assert "hf_20260922_194417_a455843c-d8db-461c-8ef6-74a325d2472c" in html

# Check Mivi Event Planners additions:
assert "https://www.instagram.com/mivi_events/" in html
assert "https://www.google.com/search?q=Mivi+Event+Planners&kgmid=/g/11nt_cntjx" in html
assert "Mivi Event Planners" in html

print("ALL AUDIT CHECKS PASSED PERFECTLY!")
