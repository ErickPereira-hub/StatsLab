from project.domain.entities.polynomial import Polynomial
from typing import Tuple, List
from numpy import linalg
from numpy import array, float64

class RegressionFactory:

    def __init__(self, dataset: List[Tuple[int | float, int | float]], deg: int):
        self.__poly: Polynomial | None = None #future best polynomial
        self.__deg: int = deg
        self.__dataset: List[Tuple[int | float, int | float]] = dataset
    
    def get_best_poly(self) -> Polynomial:
        self.__coeffs: array = self.__find_coeffs(
                                self.__get_inverse(
                                    self.__create_huge_matrix(
                                        self.__deg,
                                        self.__dataset
                                    )
                                ), self.__create_independent_terms_vector(
                                        self.__dataset,
                                        self.__deg
                                )
                            )
        self.__treated_coeffs: Tuple[int | float, ...] = tuple([float(self.__coeffs[i, 0]) for i in range(len(self.__coeffs))])
        self.__poly: Polynomial = Polynomial(self.__treated_coeffs)
        return self.__poly
    
    def __create_huge_matrix(self, deg: int, dataset: List[Tuple[int | float, int | float]]) -> array:
        self.__huge_matrix: List[List[float | int]] = list()
        #First row
        self.__first_row: List[float | int] = [len(dataset)]
        self.__first_row += [sum(point[0] ** el for point in dataset) for el in range(1, deg + 1)]
        #Appending the first row
        self.__huge_matrix.append(self.__first_row)
        #Appending the remaining rows
        for pos_vert in range(1, deg + 1):
            self.__row: List[float | int] = list()
            for pos_hor in range(deg + 1):
                self.__row.append(sum(point[0] ** (pos_hor + pos_vert) for point in dataset))
            self.__huge_matrix.append(self.__row) #Adding a new line to the matrix
        self.__huge_matrix_arr: array = array([array(row) for row in self.__huge_matrix])
        self.__huge_matrix_arr_cast: array = self.__huge_matrix_arr.astype(float64) #<--- Converting huge integers to float
        return self.__huge_matrix_arr_cast

    def __create_independent_terms_vector(self, dataset: List[Tuple[int | float, int | float]], deg: int) -> array:
        self.__itv: List[float | int] = list()
        #Adding the first element
        self.__itv.append(sum(point[1] for point in dataset))
        #Adding the remaining sums
        for pos in range(1, deg + 1):
            self.__itv.append(sum(point[1] * point[0] ** pos for point in dataset))
        return array(self.__itv).reshape((-1, 1)).astype(float64)

    def __get_inverse(self, square_matrix: array) -> array:
        self.__mat: array = square_matrix
        self.__inv_mat: array = linalg.inv(self.__mat)
        return self.__inv_mat

    def __find_coeffs(self, huge_mat_inv: array, itv: array) -> array:
        self.__sol: array = linalg.matmul(huge_mat_inv, itv)
        return self.__sol