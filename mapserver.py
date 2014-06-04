#!/usr/bin/python
import sys, os
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from werkzeug.contrib.fixers import ProxyFix
from lib import util
from lib import chunk
import json

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
app.url_map.converters['regex'] = util.RegexConverter

###############################################################################

@app.route('/')
def index():
	return app.send_static_file('mapcraft.html')
	#return render_template('index.html', players=util.getPlayers())

@app.route('/blocks')
def blockPage():
	return render_template('blocks.html')

###############################################################################
##  API Endpoints  ############################################################
###############################################################################

@app.route('/api/chunk/<x>/<z>')
def getChunk(x, z):
	x = int(x)
	z = int(z)
	#print 'got chunk coords: (%d, %d)' % (x, z)
	return util.encode(chunk.getChunk(int(x), int(z)))

###############################################################################

@app.route('/api/chunk/spawn')
def getChunkSpawn():
	#print 'got chunk coords: (%d, %d)' % (x, z)
	return json.dumps(chunk.getChunkSpawn())

###############################################################################

@app.route('/api/chunktopdown/<x>/<z>')
def getChunkTopDown(x, z):
	x = int(x)
	z = int(z)
	return json.dumps(chunk.getChunkTopDown(int(x), int(z)))

###############################################################################

@app.route('/api/players')
def getPlayers():
	return json.dumps(util.getPlayers())

###############################################################################

@app.route('/api/textures')
def getTextureFolders():
	folders = os.listdir('static/minecraft/textures')
	return json.dumps(folders)

###############################################################################

@app.route('/api/textures/<folder>')
def getTexturePaths(folder):
	texture_paths = []
	for root, dirs, files in os.walk(os.path.join('static', 'minecraft', 'textures', folder)):
		root = '/' + root.split('/', 1)[1]
		texture_paths.extend(
			[os.path.join(root, f) for f in files if os.path.splitext(f)[-1] == '.png']
		)

	return json.dumps(texture_paths)
		

###############################################################################

app.wsgi_app = ProxyFix(app.wsgi_app)

if __name__ == '__main__':
	with open('serverpid', 'w') as f:
		f.write('%d\n' % os.getpid())
	app.run(host='0.0.0.0', debug=True)
