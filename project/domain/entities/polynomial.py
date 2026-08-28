from typing import Tuple, List

class Polynomial:

    def __init__(self, coeffs: Tuple[float | int, ...] | List[float | int]):
        self.__deg: int = len(coeffs) - 1
        self.__coeffs: Tuple[float | int, ...] | List[float | int] = coeffs

    def __str__(self) -> str:
        self.__rep: str = "p(x) = "
        for ind, coeff in enumerate(self.__coeffs):
            if ind == 0:
                self.__rep += f"{coeff:.4f}"
            else:
                if coeff != 0:
                    self.__rep += " - " + f"{(-1)*coeff:.4f}" + f"x^{ind}" if coeff < 0 else " + " + f"{coeff:.4f}" + f"x^{ind}"
        return self.__rep
    
    def get_response_at(self, input: int | float) -> int | float:
        self.__resp: int | float = 0
        for ind, coeff in enumerate(self.__coeffs):
            if ind == 0:
                self.__resp += coeff
            else:
                self.__resp += coeff * input ** ind
        return self.__resp
    
    @property
    def deg(self) -> int:
        return self.__deg
    
    @property
    def coefficients(self) -> Tuple[float | int, ...]:
        return self.__coeffs