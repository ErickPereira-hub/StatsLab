from typing import List

def is_sorted(dataset: List[int | float]) -> bool:

    for ind in range(1, len(dataset)):
        if dataset[ind - 1] >= dataset[ind]:
            return False

    return True