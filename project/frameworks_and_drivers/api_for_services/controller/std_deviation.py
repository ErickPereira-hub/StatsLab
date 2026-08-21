from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from typing import Dict, Any, List
from fastapi import status, Response
from project.frameworks_and_drivers.api_for_services.body_models.std_deviation_body import StdDeviationHTTPBody

@ROUTER_SERVICE.post("/std_deviation")
def std_deviation(payload: StdDeviationHTTPBody) -> Dict[str, Any]:
    scope: int = payload.scope
    dataset: List[float] = payload.values
    if scope == 0:
        pass #Evaluate based on sample
    if scope == 1:
        pass #Evaluate based on population