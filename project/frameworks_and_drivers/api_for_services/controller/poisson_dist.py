from fastapi import status, Response
from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from typing import Dict, List
from project.application.utils.get_poisson import get_poisson

@ROUTER_SERVICE.get("/poisson_dist")
def poisson_dist(start: int, end: int, mean: float, res: Response) -> Dict[str, List[int | float | None] | bool | float]:

    CHART_INF_LIMIT: int = 20
    CHART_SUP_LIMIT: int = 40

    #Validations
    if start > end or start < 0:
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "starting value can't be bigger than ending value and starting value can't be negative"}

    ds_comp: List[float] = list() #<--- Here will be the individual probabilities
    ds_shadow: List[float] = list()
    show_chart: bool = False

    #Small dataset
    if end <= CHART_INF_LIMIT:
        show_chart = True
        for i in range(0, CHART_INF_LIMIT + 1):
            ds_comp.append(get_poisson(i, mean))
            if start <= i and i <= end:
                ds_shadow.append(get_poisson(i, mean))
            else:
                ds_shadow.append(None)

    #Medium dataset
    if CHART_INF_LIMIT < end and CHART_SUP_LIMIT >= end:
        show_chart = True
        for i in range(0, CHART_SUP_LIMIT + 1):
            ds_comp.append(get_poisson(i, mean))
            if i >= start and i <= end:
                ds_shadow.append(get_poisson(i, mean))
            else:
                ds_shadow.append(None)

    #Large datasets won't have a chart
    if CHART_SUP_LIMIT < end:
        show_chart = False

    #Getting the full probability
    prob: float = sum(get_poisson(i, mean) for i in range(start, end + 1))

    #Responding the client side
    res.status_code = status.HTTP_200_OK
    if show_chart:
        return {
            "show" : True,
            "shadow_data": ds_shadow,
            "complete_data" : ds_comp,
            "prob" : prob}
    else:
        return {
            "show" : False,
            "prob" : prob
        }