import base64

with open('logo.png', 'rb') as f:
    logo_b64 = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('ascii')

with open('template.html', 'w', encoding='utf-8') as f:
    pass
print('Ready')
