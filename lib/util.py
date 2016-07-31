import sys, os
from werkzeug.routing import BaseConverter
import config
from json import JSONEncoder, JSONDecoder


class RegexConverter(BaseConverter):
    """Enable use of regex when defining Flask routes"""
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]


def getPlayers():
    """Return a list of players on the server, based on player.dat files."""
    player_files = os.listdir(os.path.join(config.WORLD_DIR, 'players'))
    return list({os.path.splitext(p)[0] for p in player_files})

