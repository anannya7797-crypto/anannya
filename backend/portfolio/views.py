import random
import time

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BlogPost, Project, Skill, TimelineItem
from .serializers import (
    AIPredictSerializer,
    BlogPostSerializer,
    ContactSubmissionSerializer,
    ProjectSerializer,
    SkillSerializer,
    TimelineItemSerializer,
)

POSITIVE_WORDS = {"amazing", "love", "great", "awesome", "fantastic", "good", "wonderful", "incredible", "best", "happy"}
NEGATIVE_WORDS = {"bad", "hate", "terrible", "awful", "worst", "sad", "angry", "broken", "boring", "ugly"}


@api_view(["GET"])
def api_root(_request):
    return Response(
        {
            "message": "Portfolio API is running.",
            "endpoints": {
                "projects": "/api/projects/",
                "blogs": "/api/blogs/",
                "skills": "/api/skills/",
                "timeline": "/api/timeline/",
                "contact": "/api/contact/",
                "ai_infer": "/api/ai/infer/",
            },
        }
    )


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class BlogListView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class TimelineListView(generics.ListAPIView):
    queryset = TimelineItem.objects.all()
    serializer_class = TimelineItemSerializer


class ContactSubmissionCreateView(generics.CreateAPIView):
    serializer_class = ContactSubmissionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(
            {
                "ok": True,
                "id": instance.id,
                "message": "Submission received successfully.",
            },
            status=status.HTTP_201_CREATED,
        )


class AIPredictView(APIView):
    def post(self, request):
        serializer = AIPredictSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        text = serializer.validated_data["text"].lower()
        start = time.perf_counter()

        positive = sum(1 for word in POSITIVE_WORDS if word in text)
        negative = sum(1 for word in NEGATIVE_WORDS if word in text)
        score = positive - negative

        if score > 0:
            label = "Positive"
        elif score < 0:
            label = "Negative"
        else:
            label = "Neutral"

        confidence = min(0.99, 0.57 + abs(score) * 0.1 + random.uniform(0.0, 0.05))
        processing_ms = max(50, int((time.perf_counter() - start) * 1000))

        return Response(
            {
                "label": label,
                "confidence": round(confidence, 3),
                "processingMs": processing_ms,
                "model": "rule-based-sentiment-v1",
            }
        )

# Create your views here.
