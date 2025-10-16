import sys
import logging

# Add the project directory to the Python path
project_home = u'/home/kmct-ietm/todo_app'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set up logging for debugging
logging.basicConfig(stream=sys.stderr)

# Import the Flask app instance
from app import app as application
