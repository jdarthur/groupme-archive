import json
from pprint import pprint, pformat
import datetime

FILENAME = "message.json"
PARSED_USERS = "parsed_users.py"

def get_messages(filename=FILENAME):
    with open(FILENAME) as m:
        data = m.read()
        parsed = json.loads(data)

    first = parsed
    first.reverse()
    return first


def get_users(message_list):
    users = {}

    for message in message_list:
        user_id = message['sender_id']
        if user_id not in users:
            users[user_id] = {
                'aliases': [(message['name'], "original")],
                'current_nickname' : message['name'],
                'user_id': user_id
            }
        else:
            #add/remove users fucks nicknames up
            if (message['name'] != users[user_id]['current_nickname']):
                users[user_id]['current_nickname'] = message['name']

        if (user_id == 'system'):
            date = message['created_at']

            if (message.get('event', None) and message['event']['type'] == "membership.nickname_changed"):
                user_id = message['event']['data']['user']['id']
                aliases = users[str(user_id)]['aliases']
                new_name = message['event']['data']['name']
                aliases.append([new_name,  date])
            else:
                if " changed name to " in message['text']:

                    old_name = message['text'].split(" changed name to ")[0]
                    user_id = get_user_by_nickname(old_name, users)
                    new_name = message['text'].split(" changed name to ")[1]
                    users[user_id]['current_nickname'] = new_name

                    aliases = users[str(user_id)]['aliases']
                    aliases.append([new_name,  date])


    return users

def get_user_by_nickname(nickname, users):
    for user_id in users:
        if users[user_id]['current_nickname'] == nickname:
            return user_id
        for alias_tuple in users[user_id]['aliases']:
            if alias_tuple[0] == nickname:
                return user_id
    raise Exception("User '{}' not found".format(nickname))

def get_date(message):
    date = datetime.datetime.fromtimestamp(message['created_at'])
    date = date.strftime("%a, %b. %d, %Y, %I:%M%p")
    return date

def get_user_list():
    all_messages = get_messages()
    user_dict = get_users(all_messages)
    user_list = []
    for user_id in user_dict:
        user = user_dict[user_id]
        user_list.append(user_dict[user_id])
    return user_list

def write_users(filename=PARSED_USERS):
    userl = get_user_list()
    with open(PARSED_USERS, "w+") as file:
        data = "parsed_user_list = {}\n".format(pformat(userl))
        file.write(data)




if __name__ == "__main__":
    # messages = get_messages()
    # users = get_users(messages)
    # pprint(users)
    write_users()





