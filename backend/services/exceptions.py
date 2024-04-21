class ServiceNotFoundException(Exception):
    """Exception for when the service being requested is not in the table."""
    ...

class ProgramNotAssignedException(Exception):
    """Exception for when the user does not have correct access for requested services."""
    ...