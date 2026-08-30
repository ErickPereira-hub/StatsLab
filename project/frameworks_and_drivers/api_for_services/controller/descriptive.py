from project.frameworks_and_drivers.api_for_services.routes import ROUTER_SERVICE
from fastapi import status, Response
from typing import Dict, List
from project.frameworks_and_drivers.api_for_services.body_models.one_dim_dataset_body import OneDimensionalDataset
from project.application.use_cases.descriptive import DescriptiveApplicationUseCase

@ROUTER_SERVICE.post("/desc")
def descriptive(ds: OneDimensionalDataset, res: Response) -> Dict[str, int | float | None]:
    data: List[float] = ds.data #<--- List of numbers captured through Pydantic
    print(data)
    #Getting the results
    results: Dict[str, int | float] = DescriptiveApplicationUseCase(data).fetch()

    #Preparing the response and sending the JSON
    res.status_code = status.HTTP_200_OK
    return results