#!/usr/bin/python3

"""
Web server to host
- Main HTML page
- REST API endpoints for various tasks

@author: jdarthur
@date: 9 Dec. 2018
"""
import os, sys
import datetime
from pprint import pformat

from flask import Flask, jsonify, request
app = Flask(__name__)


from parsed_users import parsed_user_list
from parser import get_messages

@app.route('/api/users', methods=['GET'])
def get_all_users():
    return jsonify({"data": parsed_user_list})

@app.route('/api/messages', methods=['GET'])
def get_message_set():

    start_index = request.args.get('start_index')
    count = request.args.get('count')
    messages = get_messages(start_index, count)
    print(len(messages))
    return jsonify({"data": messages})



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
