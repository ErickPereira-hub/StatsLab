from requests import Response, post
from concurrent.futures import ThreadPoolExecutor
from typing import Dict, List

def request_login_access(uri: str, body: Dict[str, str], status_list: List[int]): 
    resp: Response = post(uri, json = body)
    status_list.append(resp.status_code)

def test_rate_limit_in_login():
    URI: str = f"http://localhost:80/api/outside/login"
    BODY: Dict[str, str] = {
        "email" : "test@test.com",
        "password" : "mocked123"
    }
    NUMBER_OF_REQUESTS: int = 20
    status_list: List[int] = list()
    with ThreadPoolExecutor(NUMBER_OF_REQUESTS) as thread:
        for _ in range(NUMBER_OF_REQUESTS):
            thread.submit(request_login_access, uri = URI, body = BODY, status_list = status_list)
    assert 429 in status_list