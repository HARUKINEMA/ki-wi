import json

f = open('src/drinking_machine.json', 'r', encoding="utf-8")

body = json.load(f)


dic = dict()
for machine in body["machines"]:
    for content in machine["contents"]:
        if not str(content) in dic:
            dic[content] = 1

print(sorted(dic.keys()))
