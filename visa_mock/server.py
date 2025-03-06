import os

import click
import fastapi
from fastapi import UploadFile
import openai
import uvicorn

from visa_mock.constants import DEFAULT_IP, DEFAULT_PORT, MODEL_ID
from visa_mock.models import EvaluateResponse

app = fastapi.FastAPI()

openai.api_key = os.getenv("OPENAI_API_KEY")
oai = openai.OpenAI()


@app.get("/hello")
def say_hello():
    return {"message": "Hello! I'm the O-1 Visa Mock Server!"}


@app.post("/evaluate")
def evaluate(file: UploadFile) -> EvaluateResponse:
    """Evaluates a queried CV for O-1 visa eligibility."""
    print(file.content_type)
    if file.content_type == "application/pdf":
        file_content = file.file.read()
    elif file.content_type == "application/octet-stream":
        file_content = file.file.read().decode("utf-8")
    else:
        raise fastapi.HTTPException(status_code=400, detail="File must be a PDF or a text file")

    print(file_content)
    print(type(file_content))

    messages = [
            {
                "role": "system",
                "content": "You are a helpful assistant that evaluates CVs for O-1 visa eligibility.",
            },
            {"role": "user", "content": file_content},
        ]

    response = oai.beta.chat.completions.parse(
        model=MODEL_ID,
        messages=messages,
        response_format=EvaluateResponse,
    )

    return response.choices[0].message.parsed


@click.command()
@click.option("--host", default=DEFAULT_IP, help="Host to run the server on")
@click.option("--port", default=DEFAULT_PORT, help="Port to run the server on")
def main(host: str, port: int):
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    main()
