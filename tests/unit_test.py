from project.application.utils.get_bin import get_bin
from project.application.utils.get_poisson import get_poisson
from typing import Dict, List

def test_poisson():
    DATA: List[Dict[str, int | float]] = [{
        "avg": 2.21,
        "qtt": 2,
        "exp": 0.26789
    },{
        "avg": 8.76,
        "qtt": 5,
        "exp": 0.06744
    }, {
        "avg": 5.11,
        "qtt": 6,
        "exp": 0.14926
    }]
    PRECISION: float = 0.001
    for data in DATA:
        assert abs(get_poisson(data["qtt"], data["avg"]) - data["exp"]) < PRECISION

def test_bin():
    DATA: List[Dict[str, int | float]] = [{
        "suc": 5,
        "tries": 10,
        "prob": 0.4,
        "exp": 0.20066
    },{
        "suc": 2,
        "tries": 10,
        "prob": 0.2,
        "exp": 0.30199
    }, {
        "suc": 2,
        "tries": 15,
        "prob": 0.3,
        "exp": 0.09156
    }]
    PRECISION: float = 0.001
    for data in DATA:
        assert abs(get_bin(data["suc"], data["tries"], data["prob"]) - data["exp"]) < PRECISION