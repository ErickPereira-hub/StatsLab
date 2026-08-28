from project.frameworks_and_drivers.api_for_services.body_models.poly_reg_body import PolyRegHTTPBody
from fastapi import status, Response
from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from typing import Dict, List, Tuple
from project.application.use_cases.poly_reg.regression import RegressionFactory
from project.application.utils.is_sorted import is_sorted

@ROUTER_SERVICE.post("/poly_reg")
def poly_reg(payload: PolyRegHTTPBody, res: Response) -> Dict[str, str | List[float | int]]:
    x: List[float] = payload.dataset_x
    y: List[float] = payload.dataset_y

    if len(x) != len(y): #The data structures must have the same size
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "X and Y must have same number of data"}

    if not is_sorted(x): #The X data must be sorted in ascending mode.
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "X must be sorted"}

    if len(x) <= payload.degree:
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "Degree must be lower than the number of points in the dataset"}

    input_ds: List[Tuple[float, float]] = list(zip(x, y))
    coeffs: Tuple[float | int] = RegressionFactory(input_ds, payload.degree).get_best_poly().coefficients
    res.status_code = status.HTTP_200_OK
    return {"coefficients": coeffs, "message": "sent"}