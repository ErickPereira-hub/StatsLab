from pydantic import BaseModel, Field
from typing import List

class PolyRegHTTPBody(BaseModel):

    degree: int = Field(..., gt = 0, le = 10)
    dataset_x: List[float]
    dataset_y: List[float]