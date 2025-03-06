# Mock Visa Application

Mock design for an application that might be able to assess Visa eligibility based on an inputed resume.

<img src="./figures/evaluation-page.jpg" width="480px"> <img src="./figures/evaluation-result.jpg" width="480px">

## Usage

Run FastAPI backend server:

```bash
poetry install
# Starts on 0.0.0.0:8072 by default
poetry run python visa_mock/server --ip=... --port=...
```

Run Web Client:
```bash
cd visa-mock-client
npm run start
```
