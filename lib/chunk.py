#!/usr/bin/python

from overviewer_core import world
import logging
import os, sys
import json
import numpy
import config

WORLD = world.World(config.WORLD_DIR)
encoder = json.JSONEncoder()

def getChunkJson(x, z):
	#logging.basicConfig(level=logging.DEBUG)
	#print 'using coords (%d, %d, %d)' % (poiX, poiY, poiZ)

	'''
	poiMinX = poiX - RADIUS
	poiMaxX = poiX + RADIUS
	poiMinZ = poiZ - RADIUS
	poiMaxZ = poiZ + RADIUS
	poiMaxY = min(256, poiY + RADIUS) # y value can't be above 255 or below 0
	poiMinY = max(0, poiY - RADIUS)
	'''

	rs = WORLD.get_regionset(None)

	zeroArray = numpy.zeros((16, 16, 16), numpy.uint16)

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

	ret = {'status': 'success', 'chunk': chunkArray.tolist()}
	return encoder.encode(ret)


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

	data = getChunkJson(poiX//16, poiZ//16)
	print data

	'''
	with open('testMap.json', 'w') as f:
		f.write(repr(xMaster.tolist()))
	'''

if __name__ == '__main__':
	main()
