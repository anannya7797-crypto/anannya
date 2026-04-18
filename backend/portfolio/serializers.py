from rest_framework import serializers

from .models import BlogPost, ContactSubmission, Project, Skill, TimelineItem


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "tech",
            "category",
            "github",
            "demo",
            "featured",
            "image",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "level", "category"]


class TimelineItemSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source="entry_type")

    class Meta:
        model = TimelineItem
        fields = ["id", "type", "title", "org", "period", "description", "details"]


class BlogPostSerializer(serializers.ModelSerializer):
    date = serializers.DateField(source="published_at", format="%Y-%m-%d")
    readingTime = serializers.CharField(source="reading_time")

    class Meta:
        model = BlogPost
        fields = ["slug", "title", "excerpt", "tags", "date", "readingTime", "content"]


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ["id", "name", "email", "message", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_message(self, value: str) -> str:
        trimmed = value.strip()
        if len(trimmed) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters.")
        return trimmed


class AIPredictSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=500)
