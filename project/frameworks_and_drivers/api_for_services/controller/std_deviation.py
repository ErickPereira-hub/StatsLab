from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from typing import Dict, Any, List
from fastapi import status, Response
from project.frameworks_and_drivers.api_for_services.body_models.std_deviation_body import StdDeviationHTTPBody
from project.application.use_cases.std_deviation import StdDeviationUseCase

@ROUTER_SERVICE.post("/std_deviation")
def std_deviation(payload: StdDeviationHTTPBody, res: Response) -> Dict[str, Any]:
    scope: int = payload.scope
    dataset: List[float] = payload.values
    res.status_code = status.HTTP_200_OK
    if scope == 0:
        return {
            "results" : StdDeviationUseCase.get_std_deviation(dataset, False),
            "style" : "sample"
            }
    if scope == 1:
        return {
            "results" : StdDeviationUseCase.get_std_deviation(dataset, True),
            "style" : "population"
            }