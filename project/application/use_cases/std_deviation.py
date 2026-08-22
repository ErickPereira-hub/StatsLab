import numpy as np
from project.domain.entities.dataset import DataSetEntity
from typing import Dict, List, Tuple
from math import sqrt

class StdDeviationUseCase:

    @staticmethod
    def get_std_deviation(pure_dataset: List[float | int], population: bool) -> Dict[str, float | bool]:
        dataset: DataSetEntity = DataSetEntity(pure_dataset)
        if dataset.must_have_numbers():
            avg: float = np.average(np.array(dataset.ds))
            dividend: int = len(dataset.ds) if population else len(dataset.ds) - 1
            variance: float = sum((data - avg) ** 2 for data in dataset.ds) / dividend
            std_dev: float = sqrt(variance)
            return {"variance" : variance, "std_dev" : std_dev, "success": True}
        return {"success": False}