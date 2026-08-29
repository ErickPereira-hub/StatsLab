from math import factorial, e, log
from typing import Callable

get_poisson: Callable[[int, int | float], float] = lambda input_qtt, avg : e ** (log(avg) * input_qtt + ((-1)*avg) - log(factorial(input_qtt))) if avg > 0 else 0