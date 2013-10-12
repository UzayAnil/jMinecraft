from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
from werkzeug.routing import BaseConverter
from createpoi import getChunkJson


class RegexConverter(BaseConverter):
	def __init__(self, url_map, *items):
		super(RegexConverter, self).__init__(url_map)
		self.regex = items[0]


app = Flask(__name__)
app.url_map.converters['regex'] = RegexConverter

@app.route('/')
def hello():
	return 'Hello World!'

@app.route('/chunk/<regex("-?\d+"):x>/<regex("-?\d+"):z>')
def getChunk(x, z):
	x = int(x)
	z = int(z)
	print 'got chunk coords: (%d, %d)' % (x, z)
	return getChunkJson(int(x), int(z))

#app.wsgi_app = ProxyFix(app.wsgi_app)

if __name__ == '__main__':
	app.run(host='0.0.0.0')
