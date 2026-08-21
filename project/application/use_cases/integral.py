from project.domain.entities.simpson import SimpsonEntity
from typing import Callable, List
import numpy as np

class IntegralUseCase:

    def __init__(self, callback: Callable[[float | int], float], n_precision: int, a: float | int, b: float | int):
        self.__simpson_obj: SimpsonEntity = SimpsonEntity(callback, n_precision, a, b) #<--- Instance and automatic validation of a Simpson object that will be used to evaluate integrals

    def get_integral(self) -> float:
    
            self.__h: float = (self.__simpson_obj.end - self.__simpson_obj.start) / self.__simpson_obj.n_precision #<--- Size of each sub-interval
    
            #Defining values over the axes
            self.__x_values: np.array = np.linspace(self.__simpson_obj.start, self.__simpson_obj.end, self.__simpson_obj.n_precision + 1)
            self.__y_values: List[float | int] = list(self.__simpson_obj.callback(val) for val in self.__x_values)
    
            #Defining the component
            self.__comp: int | float = 0
            self.__comp += self.__y_values[0] + self.__y_values[-1]
            self.__comp += 4 * sum(val for ind, val in enumerate(self.__y_values[0: -2]) if ind % 2 != 0)
            self.__comp += 2 * sum(val for ind, val in enumerate(self.__y_values[2: -3]) if ind % 2 == 0)
    
            self.__area: float = (self.__h / 3) * self.__comp #<--- Area bellow the curve for this interval
    
            return self.__area