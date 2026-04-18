from django.contrib import admin

from .models import BlogPost, ContactSubmission, Project, Skill, TimelineItem


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "featured", "sort_order")
    list_filter = ("category", "featured")
    search_fields = ("title", "description")
    ordering = ("sort_order", "id")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "level", "sort_order")
    list_filter = ("category",)
    search_fields = ("name",)
    ordering = ("category", "sort_order", "id")


@admin.register(TimelineItem)
class TimelineItemAdmin(admin.ModelAdmin):
    list_display = ("title", "entry_type", "period", "sort_order")
    list_filter = ("entry_type",)
    search_fields = ("title", "org", "period")
    ordering = ("sort_order", "id")


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "published_at", "sort_order")
    search_fields = ("title", "slug", "excerpt")
    ordering = ("-published_at", "sort_order", "id")


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at")
    search_fields = ("name", "email", "message")
    ordering = ("-created_at",)

# Register your models here.
