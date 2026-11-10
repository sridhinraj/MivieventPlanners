import json

with open('ashen-press.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for f in data.get('files', []):
    path = f['path']
    sha = f.get('sha256')
    print('Path:', path, 'Lines:', f.get('lines'), 'SHA:', sha)
    if 'ashen-press.html' in path:
        with open('ashen-press.html', 'w', encoding='utf-8') as out:
            out.write(f['code'])
    if 'AshenPress.tsx' in path:
        with open('AshenPress.tsx', 'w', encoding='utf-8') as out:
            out.write(f['code'])
    if 'threeui.css' in path:
        with open('threeui.css', 'w', encoding='utf-8') as out:
            out.write(f['code'])

print('Assets count:', len(data.get('assets', [])))
for a in data.get('assets', []):
    print(a)
