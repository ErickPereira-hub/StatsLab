from typing import Callable

class SimpsonEntity:

    def __init__(self, callback: Callable[[float | int], float], n_precision: int, a: float | int, b: float | int) -> None:
        self.callback: Callable[[float | int], float] = callback
        self.n_precision: int = n_precision
        self.start: float | int = a
        self.end: float | int = b
        #Validating the precision
        self.__check_precision(self.n_precision)
        #Validating the interval
        self.__check_interval(start = self.start, end = self.end)

    def __check_precision(self, n_precision: int) -> None:
        if n_precision % 2 != 0 or n_precision <= 0 or not isinstance(n_precision, int):
            raise ValueError("The n_precision must be even, not odd")

    def __check_interval(self, start: int | float, end: int | float) -> None:
        if start >= end:
            raise ValueError("a must be lower than b")