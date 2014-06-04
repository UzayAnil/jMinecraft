#!/usr/bin/python

from overviewer_core import world
import logging
import os, sys
import numpy
try:
	import config
	WORLD = world.World(config.WORLD_DIR)
except ImportError:
	WORLD_DIR = '/home/bschlenk/minecraft/world'
	WORLD = world.World(WORLD_DIR)

def getChunk(x, z):
	rs = WORLD.get_regionset(None)

	zeroArray = numpy.zeros((16, 16, 16), numpy.uint8)

	try:
		chunk = rs.get_chunk(x, z)
	except world.ChunkDoesntExist, e:
		return encoder.encode({'status': 'failure', 'msg': str(e)})

	chunkArray = None
	for s in chunk['Sections']:
		section = s['Blocks']

		if chunkArray is None:
			chunkArray = section
		else:
			chunkArray = numpy.concatenate((chunkArray, section), axis=0)

	return {'status': 'success', 'data': chunkArray.tolist()}


def getChunkSpawn():
	x, y, z = WORLD.find_true_spawn()
	return getChunk(x//16, z//16)


def getChunkTopDown(x, z):
	rs = WORLD.get_regionset(None)

	try:
		chunk = rs.get_chunk(x, z)
	except world.ChunkDoesntExist, e:
		return encoder.encode({'status': 'failure', 'msg': str(e)})

	heightMap = chunk['HeightMap']
	topView = numpy.zeros((16, 16), numpy.uint8)
	for index, h in enumerate(heightMap):
		x = index % 16
		z = index // 16
		y = (h - 1) % 16

		try:
			section = chunk['Sections'][(h - 1) // 16]['Blocks']
		except IndexError:
			continue

		topView[z][x] = section[y-1][z][x]

	return {'status': 'success', 'data': topView.tolist()}
	


def main():
	if len(sys.argv) != 4:
		#print 'usage: %s x y z' % sys.argv[0]
		#sys.exit(2)
		poiX, poiY, poiZ = WORLD.find_true_spawn()
	else:
		try:
			poiX, poiY, poiZ = [int(x) for x in sys.argv[1:]]
		except ValueError:
			print 'Values for x y and z must be integers'
			sys.exit(1)

	data = getChunkTopDown(poiX//16, poiZ//16)
	print data

	'''
	with open('testMap.json', 'w') as f:
		f.write(repr(xMaster.tolist()))
	'''

if __name__ == '__main__':
	main()
