from typing import List
from project.domain.entities.dataset import DataSetEntity
from math import sqrt

class CorrelationUseCase:

    def __init__(self, dsx: List[float | int], dsy: List[float | int]):
        self.__dsx: DataSetEntity = DataSetEntity(dsx)
        self.__dsy: DataSetEntity = DataSetEntity(dsy)
        self.__validate() #<--- Validating the object

    def __validate(self) -> None:
        if not DataSetEntity.same_size(self.__dsx, self.__dsy):
            raise ValueError("both arrays must have same size")

    def get_corr_value(self) -> float | int:
        self.__top: float | int = len(self.__dsx) * sum(x * y for x, y in zip(self.__dsx, self.__dsy)) - sum(x for x in self.__dsx) * sum(y for y in self.__dsy)
        self.__bottom: float | int = sqrt(len(self.__dsx) * sum(x ** 2 for x in self.__dsx) - sum(x for x in self.__dsx) ** 2) * sqrt(len(self.__dsx) * sum(y ** 2 for y in self.__dsy) - sum(y for y in self.__dsy) ** 2)
        self.__corr: float | int = self.__top / self.__bottom
        return self.__corr