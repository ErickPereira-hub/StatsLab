from typing import List, Tuple, Dict
import numpy as np
from project.domain.entities.dataset import DataSetEntity
from math import sqrt

class DescriptiveApplicationUseCase:

    def __init__(self, data: List[float]):
        self.__ds = DataSetEntity(data)
        self.__ds.ds.sort() #<--- Sorting the dataset in asc mode

    def get_avg(self) -> float:
        return sum(data for data in self.__ds.ds) / len(self.__ds)

    def get_median(self) -> float:
        if len(self.__ds) % 2 == 0:
            return 0.5 * (self.__ds[int(len(self.__ds) / 2)] + self.__ds[int(1 + len(self.__ds) / 2)])
        else:
            return self.__ds[int((len(self.__ds) + 1) / 2)]

    def get_mode(self) -> Tuple[float, int] | None:
        uarr, carr = np.unique(self.__ds.ds, return_counts = True)

        if len(uarr) == len(self.__ds):
            return None #They have same size, so there is no repetition

        max_count: int = max(carr)
        times: int = 0
        for count in carr:
            if max_count == count:
                times += 1
            if times == 2:
                return None #<--- At this point, repetition of the mode has been found
        
        for val, count in zip(uarr, carr):
            if count == max_count:
                return val, count

    def get_variance(self, population: bool, avg: float) -> float:
        dividend: int = len(self.__ds) if population else len(self.__ds.ds) - 1
        variance: float = sum((data - avg) ** 2 for data in self.__ds.ds) / dividend
        return variance

    def get_std_dev(self, variance: float) -> float:
        return sqrt(variance)

    def get_mean_deviation(self, avg: float) -> float:
        return sum(abs(i - avg) for i in self.__ds.ds) / len(self.__ds)


    def fetch(self) -> Dict[str, int | float]:
        self.__avg: float = self.get_avg()
        self.__median: float = self.get_median()
        self.__mode: float = self.get_mode()[0] if self.get_mode() is not None else None
        self.__sample_var: float = self.get_variance(False, self.__avg)
        self.__pop_var: float = self.get_variance(True, self.__avg)
        self.__sample_std_dev: float = self.get_std_dev(self.__sample_var)
        self.__pop_std_dev: float = self.get_std_dev(self.__pop_var)
        self.__mean_dev: float = self.get_mean_deviation(self.__avg)
        return {
            "average" : self.__avg,
            "median" : self.__median,
            "mode" : self.__mode,
            "sample_var" : self.__sample_var,
            "population_var" : self.__pop_var,
            "sample_std_dev" : self.__sample_std_dev,
            "population_std_dev" : self.__pop_std_dev,
            "mean_dev" : self.__mean_dev
        }