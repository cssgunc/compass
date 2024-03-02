"""Sample Test File"""

import pytest
from sqlalchemy import Engine


def test_sample(session: Engine):
    print(session)
    assert session != None


def test_tables(session: Engine):
    print()
