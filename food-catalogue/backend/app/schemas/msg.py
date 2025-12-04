from pydantic import BaseModel

class Msg(BaseModel):
    msg: str

# Bug: No example provided for OpenAPI documentation
