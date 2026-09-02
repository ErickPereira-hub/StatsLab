from math import factorial
from typing import Callable

get_bin: Callable[[int, int, float], float | int] = lambda suc, tries, prob : (factorial(tries) / (factorial(suc) * factorial(tries - suc))) * ( prob ** suc ) * ( 1 - prob ) ** (tries - suc)