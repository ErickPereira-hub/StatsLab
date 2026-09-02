from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from fastapi import status, Response
from typing import Dict, List
from project.application.utils.get_bin import get_bin

@ROUTER_SERVICE.get("/binomial_dist")
def binomial_dist(
    prob: float,
    min_suc: int,
    max_suc: int,
    tries: int,
    res: Response
    ) -> Dict[str, List[int | float | None] | int | float | str]:

    if prob > 1 or prob < 0:
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "probability must be between 0 and 1"}
    
    #Validations
    if min_suc > max_suc or min_suc < 0 or tries < max_suc:
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "Minimum of success must be =< than Maximum number of success, the minimum number of success must be >= 0 and maximum number of success must be =< number of tries"}
    
    ds_comp: List[float | int] = list() #<--- Complete number of probabilities
    ds_shadow: List[float | int] = list() #<--- Searched number of probabilities
    
    for i in range(0, tries + 1):
        ds_comp.append(get_bin(i, tries, prob))
        if min_suc <= i and i <= max_suc:
            ds_shadow.append(get_bin(i, tries, prob))
        else:
            ds_shadow.append(None)
    
    #Getting the full probability
    prob: float = sum(get_bin(i, tries, prob) for i in range(min_suc, max_suc + 1))
    
    #Responding the client side
    res.status_code = status.HTTP_200_OK
    return {
        "shadow_data": ds_shadow,
        "complete_data" : ds_comp,
        "prob" : prob}