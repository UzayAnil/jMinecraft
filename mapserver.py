#!/usr/bin/python
import sys, os
from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
from lib import util
from lib.chunk import getChunkJson


app = Flask(__name__)
app.config.from_object('config')
app.url_map.converters['regex'] = util.RegexConverter

@app.route('/')
def index():
	return 'Hello World!'

@app.route('/chunk/<regex("-?\d+"):x>/<regex("-?\d+"):z>')
def getChunk(x, z):
	x = int(x)
	z = int(z)
	#print 'got chunk coords: (%d, %d)' % (x, z)
	return getChunkJson(int(x), int(z))

#app.wsgi_app = ProxyFix(app.wsgi_app)

if __name__ == '__main__':
	with open('serverpid', 'w') as f:
		f.write('%d\n' % os.getpid())
	app.run(host='0.0.0.0', debug=True)
