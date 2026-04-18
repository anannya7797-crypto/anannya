from django.urls import path

from portfolio.views import (
    AIPredictView,
    BlogListView,
    ContactSubmissionCreateView,
    ProjectListView,
    SkillListView,
    TimelineListView,
    api_root,
)


urlpatterns = [
    path("", api_root, name="api-root"),
    path("projects/", ProjectListView.as_view(), name="projects-list"),
    path("blogs/", BlogListView.as_view(), name="blogs-list"),
    path("skills/", SkillListView.as_view(), name="skills-list"),
    path("timeline/", TimelineListView.as_view(), name="timeline-list"),
    path("contact/", ContactSubmissionCreateView.as_view(), name="contact-create"),
    path("ai/infer/", AIPredictView.as_view(), name="ai-infer"),
]
