import re

files = ["scripts/gen_w129.py", "scripts/gen_w130_w131.py", "scripts/gen_w133_w134.py"]
for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace('\\"en\\": \\"', '"en": "')
    content = content.replace('\\"vi\\": \\"', '"vi": "')
    content = content.replace('\\"words\\": [', '"words": [')
    content = content.replace('\\"ipa\\": \\"', '"ipa": "')
    content = content.replace(', ipa: "', ', "ipa": "')
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Cleaned:", fpath)
