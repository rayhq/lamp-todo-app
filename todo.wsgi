import os
import sys
import logging

project_home = os.path.dirname(__file__)
if project_home not in sys.path:
    sys.path.insert(0, project_home)

logging.basicConfig(stream=sys.stderr)

from app import app as application
