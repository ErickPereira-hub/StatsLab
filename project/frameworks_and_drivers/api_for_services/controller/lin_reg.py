from project.frameworks_and_drivers.api_for_services.body_models.lin_reg_body import LinRegHTTPBody
from fastapi import status, Response
from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from typing import Dict, List, Tuple
from project.application.use_cases.poly_reg.regression import RegressionFactory
from project.application.utils.is_sorted import is_sorted
from project.application.use_cases.correlation import CorrelationUseCase

@ROUTER_SERVICE.post("/lin_reg")
def poly_reg(pld: LinRegHTTPBody, res: Response) -> Dict[str, float |int |str | List[float | int]]:
    x: List[float] = pld.dataset_x
    y: List[float] = pld.dataset_y

    if len(x) != len(y): #The data structures must have the same size
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "X and Y must have same number of data"}

    if not is_sorted(x): #The X data must be sorted in ascending mode.
        res.status_code = status.HTTP_422_UNPROCESSABLE_CONTENT
        return {"message": "X must be sorted"}

    input_ds: List[Tuple[float, float]] = list(zip(x, y))
    coeffs: Tuple[float | int, float | int] = RegressionFactory(input_ds, 1).get_best_poly().coefficients
    corr: float | int = CorrelationUseCase(x, y).get_corr_value()
    res.status_code = status.HTTP_200_OK
    return {"coefficients": coeffs, "message": "sent", "correlation": corr}