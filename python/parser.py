import json
from pprint import pprint
import datetime


FILENAME = "message.json"

def get_all_messages(filename=FILENAME):
    with open(FILENAME) as m:
        data = m.read()
        parsed = json.loads(data)

    first = parsed[:]
    first.reverse()
    return first

def get_message_count():
    with open(FILENAME) as m:
        data = m.read()
        parsed = json.loads(data)
        return len(parsed)

def get_messages(start_index=0, count=100):
    mesg = get_all_messages()
    return mesg[int(start_index) : int(start_index) + int(count)]

if __name__ == "__main__":
    messages = get_messages()
    for key in messages:
        date = datetime.datetime.fromtimestamp(key['created_at'])
        date = date.strftime("%a, %b. %d, %Y, %I:%M%p")
        print("{} ({}): {}".format(key['name'], date, key['text']))
