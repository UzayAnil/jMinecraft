import os, sys
import json
import config

def getStats():
	stats_files = os.listdir(os.path.join(config.WORLD_DIR, 'stats'))

	with open(os.path.join(config.WORLD_DIR, 'stats', stats_files[0])) as f:
		data = f.read()

	stats = json.loads(data)
	stat_objects = {}
	for s in stats:
		curr = stat_objects
		fields = s.split('.')
		for f in fields[:-1]:
			curr = curr.setdefault(f, {})
		curr[fields[-1]] = stats[s]

	return stat_objects

if __name__ == '__main__':
	stats = getStats()
	print stats

	for s in stats:
		print s
		print stat_objects[s]
		print
