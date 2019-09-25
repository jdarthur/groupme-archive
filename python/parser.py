import json
from pprint import pprint
import datetime

FILENAME = "message.json"
with open(FILENAME) as m:
    data = m.read()
    parsed = json.loads(data)

first= parsed[-100:]
first.reverse()
for key in first:
    pprint(key)
    #print(key['created_at'])
    date = datetime.datetime.fromtimestamp(key['created_at'])
    date = date.strftime("%a, %b. %d, %Y, %I:%M%p")
    print("{} ({}): {}".format(key['name'], date, key['text']))
