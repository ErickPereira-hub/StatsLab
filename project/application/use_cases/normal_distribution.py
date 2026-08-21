import numpy as np
from project.application.use_cases.integral import IntegralUseCase
from typing import Callable, Optional
from math import sqrt

class NormalDistributionUseCase:

    PRECISION: int = 10000 #<--- Precision is directly proportional to the correct value of the probability

    @classmethod
    def __validate_range(cls, start, end) -> bool:
        if start > end: return False
        return True

    @classmethod
    def get_probability(cls, start_val: Optional[int | float], end_val: Optional[int | float], std_deviation: float, avg: float) -> float | None:

        #Density probability function for the ND
        density: Callable[[float | int], float] = lambda x : ( np.e ** ( ( -1 / 2 ) * ( ( x - avg ) / std_deviation ) ** 2 ) ) / ( std_deviation * sqrt(2 * np.pi) )

        if start_val is None:

            if end_val is None:
                return 1 #<--- The probability of fiding a variable in IR is 1

            if end_val < 0:
                return 0.5 - IntegralUseCase(
                    callback = density,
                    n_precision = cls.PRECISION,
                    a = 0,
                    b = -end_val
                    ).get_integral()

            if end_val > 0:
                return 0.5 + IntegralUseCase(
                    callback = density,
                    n_precision = cls.PRECISION,
                    a = 0,
                    b = end_val
                ).get_integral()

            if end_val == 0: return 0.5

        if end_val is None:

            if start_val < 0:
                return 0.5 + IntegralUseCase(
                    callback = density,
                    n_precision = cls.PRECISION,
                    a = 0,
                    b = -start_val
            ).get_integral()

            if start_val > 0:
                return 0.5 - IntegralUseCase(
                    callback = density,
                    n_precision = cls.PRECISION,
                    a = 0,
                    b = start_val
                    ).get_integral()

            if start_val == 0: return 0.5

        if start_val == end_val: return 0 #<--- Identical inputs must return ZERO
        if not cls.__validate_range(start_val, end_val): return None #<--- Validating range. If None is returned, it means that the input is wrong such that the starting point is bigger than the ending point.

        #Acquiring probability of fiding the value between start_val and end_val where the extremes are limitted
        prob: float = IntegralUseCase(
            callback = density,
            n_precision = cls.PRECISION,
            a = start_val,
            b = end_val
        ).get_integral()

        return prob