"""
This file contains exceptions found in the service layer.

These custom exceptions can then be handled peoperly
at the API level.
"""


class ResourceNotFoundException(Exception):
    """ResourceNotFoundException is raised when a user attempts to access a resource that does not exist."""


class UserPermissionException(Exception):
    """UserPermissionException is raised when a user attempts to perform an action they are not authorized to perform."""

    def __init__(self, action: str, resource: str):
        super().__init__(f"Not authorized to perform `{action}` on `{resource}`")


class ServiceNotFoundException(Exception):
    """Exception for when the service being requested is not in the table."""

class TagNotFoundException(Exception):
    """Exception for when the tag being requested is not in the table."""

class ProgramNotAssignedException(Exception):
    """Exception for when the user does not have correct access for requested services."""
