import re

def count(path):
    with open(path) as f:
        text = re.search(r'content_en:\s*"([^"]+)"', f.read(), re.DOTALL).group(1).replace('**', '')
        return len(text.split())

adv_r = count('src/data/weeks/week_02/read.js')
adv_e = count('src/data/weeks/week_02/explore.js')
easy_r = count('src/data/weeks_easy/week_02/read.js')
easy_e = count('src/data/weeks_easy/week_02/explore.js')

print('\n📊 FINAL WORD COUNT VALIDATION:')
print('=' * 50)
print(f'Advanced read:    {adv_r} words (need 100-120)')
print(f'Advanced explore: {adv_e} words (need 100-120)')
print(f'Easy read:        {easy_r} words (need 60-80)')
print(f'Easy explore:     {easy_e} words (need 60-80)')
print('=' * 50)

passed = (100 <= adv_r <= 120 and 100 <= adv_e <= 120 and 
          60 <= easy_r <= 80 and 60 <= easy_e <= 80)

if passed:
    print('\n🎉 ALL 4 FILES PASS! 100% QUALITY!')
else:
    print('\n⚠️ Need adjustment')
