from django.db import models


class Project(models.Model):
    class Category(models.TextChoices):
        AI_ML = "AI/ML", "AI/ML"
        FULL_STACK = "Full-Stack", "Full-Stack"
        SYSTEMS = "Systems", "Systems"
        FRONTEND = "Frontend", "Frontend"

    title = models.CharField(max_length=255)
    description = models.TextField()
    tech = models.JSONField(default=list)
    category = models.CharField(max_length=20, choices=Category.choices)
    github = models.URLField(blank=True)
    demo = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    image = models.URLField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self) -> str:
        return self.title


class Skill(models.Model):
    class Category(models.TextChoices):
        FRONTEND = "Frontend", "Frontend"
        BACKEND = "Backend", "Backend"
        AI_ML = "AI/ML", "AI/ML"
        DEVOPS = "DevOps", "DevOps"

    name = models.CharField(max_length=100)
    level = models.PositiveSmallIntegerField()
    category = models.CharField(max_length=20, choices=Category.choices)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["category", "sort_order", "id"]

    def __str__(self) -> str:
        return self.name


class TimelineItem(models.Model):
    class EntryType(models.TextChoices):
        EDUCATION = "education", "Education"
        EXPERIENCE = "experience", "Experience"
        PROJECT = "project", "Project"

    entry_type = models.CharField(max_length=20, choices=EntryType.choices)
    title = models.CharField(max_length=255)
    org = models.CharField(max_length=255)
    period = models.CharField(max_length=100)
    description = models.TextField()
    details = models.JSONField(default=list, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self) -> str:
        return self.title


class BlogPost(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    excerpt = models.TextField()
    tags = models.JSONField(default=list)
    published_at = models.DateField()
    reading_time = models.CharField(max_length=50)
    content = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-published_at", "sort_order", "id"]

    def __str__(self) -> str:
        return self.title


class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=255)
    message = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} <{self.email}>"

# Create your models here.
