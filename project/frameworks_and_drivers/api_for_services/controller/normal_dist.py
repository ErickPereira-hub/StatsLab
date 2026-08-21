from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from typing import Dict, Any
from project.application.use_cases.normal_distribution import NormalDistributionUseCase
from fastapi import status, Response

@ROUTER_SERVICE.get("/normal_dist")
def normal_dist(std_deviation: float, avg: float, start: float, end: float, res: Response) -> Dict[str, Any]:
    ND_PROB: float = NormalDistributionUseCase.get_probability(
        start_val = start,
        end_val = end,
        std_deviation = std_deviation,
        avg = avg
    )
    if ND_PROB is not None:
        #If the request is ok
        res.status_code = status.HTTP_200_OK
        return {"probability" : ND_PROB, "message" : "ok"}
    #If the request doesn't make sense
    res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
    return {"message" : "the first value must be lower than the last value"}