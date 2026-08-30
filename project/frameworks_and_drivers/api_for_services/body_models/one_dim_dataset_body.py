from pydantic import BaseModel, Field
from typing import List

class OneDimensionalDataset(BaseModel):

    #Limiting the size of the dataset between 6 and 10000 elements (48 Bytes to 800 KBytes)
    data: List[float] = Field(..., min_length=6, max_length=100000)