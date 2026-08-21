from pydantic import BaseModel, Field
from typing import List

class StdDeviationHTTPBody(BaseModel):

    values: List[float]
    scope: int = Field(..., ge = 0, le = 1) #0 means that data is a sample contained in the population, 1 means that the data itself is the population