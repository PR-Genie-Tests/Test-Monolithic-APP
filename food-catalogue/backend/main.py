from fastapi import FastAPI
from starlette.responses import RedirectResponse
from app.api.v1.api import api_router

app = FastAPI(
    title="Food Catalogue API",
    openapi_url="/openapi.json",
    docs_url="/documentation",
    redoc_url=None,
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return RedirectResponse(url="/documentation")

# Bug: Missing exception handling for startup events
# Bug: No CORS middleware, leading to frontend issues
# Bug: No database connection on startup, will fail later
