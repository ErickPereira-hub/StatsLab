from pydantic import BaseModel
from typing import List

class LinRegHTTPBody(BaseModel):

    dataset_x: List[float]
    dataset_y: List[float]