from project.application.use_cases.integral import IntegralUseCase
from project.application.use_cases.normal_distribution import NormalDistributionUseCase

def test_integral():
    area: float | int = IntegralUseCase(lambda x: x ** 2, 10000, a = 0, b = 1).get_integral()
    exp_result: float = 1 / 3
    PRECISION: float = 0.001
    assert area - exp_result < PRECISION

def test_normal_distribution():
    START: float | int = -1
    END: float | int = 1
    STD_DEV: float = 0.12
    AVG: float = 1.1
    prob: float = NormalDistributionUseCase.get_probability(START, END, STD_DEV, AVG)
    EXP_RESULT: float = 0.202328
    PRECISION: float = 0.001
    assert prob - EXP_RESULT < PRECISION