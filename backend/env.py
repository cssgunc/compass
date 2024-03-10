"""Load environment variables from a .env file or the process' environment."""

import os
import dotenv

# Load envirnment variables from .env file upon module start.
dotenv.load_dotenv(f"{os.path.dirname(__file__)}/.env", verbose=True)


def getenv(variable: str) -> str:
    """Get value of environment variable or raise an error if undefined.

    Unlike `os.getenv`, our application expects all environment variables it needs to be defined
    and we intentionally fast error out with a diagnostic message to avoid scenarios of running
    the application when expected environment variables are not set.
    """
    value = os.getenv(variable)
    if value is not None:
        return value
    else:
        raise NameError(f"Error: {variable} Environment Variable not Defined")
