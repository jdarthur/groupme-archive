import json
from pprint import pprint
import datetime

FILENAME = "message.json"
with open(FILENAME) as m:
    data = m.read()
    parsed = json.loads(data)

first= parsed
first.reverse()

big_like_list = []
for key in first:
    # pprint(key)
    #print(key['created_at'])
    # print(favorited_by)
    if (len(key['favorited_by']) > 4):
        pprint(key)
        url = ""
        if (len(key['attachments']) != 0 and key['attachments'][0].get('url', None)):
            # print(key['attachments'])
            url = key['attachments'][0]['url']
        date = datetime.datetime.fromtimestamp(key['created_at'])
        date = date.strftime("%a, %b. %d, %Y, %I:%M%p")
        strv = "{} LIKES #### {} ({}): {} {}".format(len(key['favorited_by']), key['name'], date, key['text'], url)

        big_like_list.append(strv)

big_like_list.sort()

for message in big_like_list:
    print(message)
