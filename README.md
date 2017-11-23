# setup

$ git clone https://github.com/urielaero/arjs-examples.git
$ cd arjs-examples

# setup https ()
$ openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes

# server:
$ python simple-https-server.py 

# open https://localhost:8008/


# add new example:
* include scripts (js/artool.js)
* see math.html and js/axis.js for examples.
* update data.json to see the changes in the front-end.

# [Mathbox](https://gitgud.io/unconed/mathbox) 
