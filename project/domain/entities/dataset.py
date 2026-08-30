from typing import Tuple, List

class DataSetEntity:

    def __init__(self, dataset: List[float | int] | List[Tuple[float | int, ...]]):
        self.ds: List[float | int] | List[Tuple[float | int, ...]] = dataset

    def must_have_numbers(self) -> bool:
        for data in self.ds:
            if not isinstance(data, float) and not isinstance(data, int):
                return False #<--- Means that we don't have only numbers.
        return True

    def __len__(self) -> int:
        return len(self.ds)

    def __getitem__(self, item: int) -> float | int | Tuple[float | int, ...]:
        return self.ds[item]