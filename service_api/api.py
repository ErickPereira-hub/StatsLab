import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
import project.frameworks_and_drivers.api_for_services.controller #<--- Guarantee that the endpoints will be captured
from fastapi import FastAPI

api: FastAPI = FastAPI()
api.include_router(ROUTER_SERVICE) #<--- Registering the Statistical Endpoints