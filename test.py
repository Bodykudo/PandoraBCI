import requests
import json

data = {
    "data": [5, 0, 2, 1, 6, 0, 2, 3, 4]
}

json_data = json.dumps(data)
conn = http.client.HTTPConnection("http://172.28.130.242:80")
print(conn)
headers = {
    "Content-Type": "application/json"
}

conn.request("POST", "/post", json_data, headers)
response = conn.getresponse()
response_data = response.read()
print(response_data)

