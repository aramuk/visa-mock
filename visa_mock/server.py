import os

import click
import fastapi
from fastapi import UploadFile
from fastapi.middleware.cors import CORSMiddleware
import openai
import pypdf
import uvicorn

from visa_mock.constants import (
    DEFAULT_IP,
    DEFAULT_PORT,
    MODEL_ID,
    CORS_ORIGINS_WHITELIST,
    PROMPT_FACT_EXTRACTION,
)
from visa_mock.models import EvaluateResponse

app = fastapi.FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS_WHITELIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")
oai = openai.OpenAI()


@app.get("/hello")
def say_hello():
    return {"message": "Hello! I'm the O-1 Visa Mock Server!"}


@app.post("/evaluate")
def evaluate(file: UploadFile) -> EvaluateResponse:
    """Evaluates a queried CV for O-1 visa eligibility."""
    if file.content_type == "application/pdf":
        reader = pypdf.PdfReader(file.file)
        file_content = "\n".join([page.extract_text() for page in reader.pages])
    elif file.content_type == "application/octet-stream":
        file_content = file.file.read().decode("utf-8")
    else:
        raise fastapi.HTTPException(
            status_code=400, detail="File must be a PDF or a text file"
        )

    messages = [
        {
            "role": "system",
            "content": PROMPT_FACT_EXTRACTION,
        },
        {"role": "user", "content": file_content},
    ]

    print(messages)

    response = oai.beta.chat.completions.parse(
        model=MODEL_ID,
        messages=messages,
        response_format=EvaluateResponse,
        temperature=0.0,
    )

    return response.choices[0].message.parsed


@click.command()
@click.option("--host", default=DEFAULT_IP, help="Host to run the server on")
@click.option("--port", default=DEFAULT_PORT, help="Port to run the server on")
def main(host: str, port: int):
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    main()
