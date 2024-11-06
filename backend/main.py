from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.gzip import GZipMiddleware


from .api import user, health, service, resource, tag

description = """
Welcome to the **COMPASS** RESTful Application Programming Interface.
"""

app = FastAPI(
    title="Compass API",
    version="0.0.1",
    description=description,
    openapi_tags=[
        user.openapi_tags,
        health.openapi_tags,
        service.openapi_tags,
        resource.openapi_tags,
        tag.openapi_tags
    ],
)

app.add_middleware(GZipMiddleware)

feature_apis = [user, health, service, resource, tag]

for feature_api in feature_apis:
    app.include_router(feature_api.api)


# Add application-wide exception handling middleware for commonly encountered API Exceptions
@app.exception_handler(Exception)
def permission_exception_handler(request: Request, e: Exception):
    return JSONResponse(status_code=403, content={"message": str(e)})
