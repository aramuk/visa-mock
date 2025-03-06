from enum import Enum
from typing import List

from pydantic import BaseModel


class EvaluateRequest(BaseModel):
    pass


class O1QualificationRating(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class O1Criteria(str, Enum):
    awards = "awards"
    membership = "membership"
    press = "press"
    judging = "judging"
    original_contribution = "original_contribution"
    scholary_article = "scholary_article"
    critical_employment = "critical_employment"
    high_renumeration = "high_renumeration"


class Achievement(BaseModel):
    achievement: str
    criteria: O1Criteria
    context: str
    reasoning: str


class Rating(BaseModel):
    rating: O1QualificationRating
    reason: str


class EvaluateResponse(BaseModel):
    achievements: List[Achievement]
    rating: Rating
