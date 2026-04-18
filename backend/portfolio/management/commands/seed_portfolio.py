from datetime import date

from django.core.management.base import BaseCommand

from portfolio.models import BlogPost, Project, Skill, TimelineItem


class Command(BaseCommand):
    help = "Seed portfolio data for local development."

    def handle(self, *args, **options):
        self.seed_projects()
        self.seed_skills()
        self.seed_timeline()
        self.seed_blogs()
        self.stdout.write(self.style.SUCCESS("Portfolio seed data is ready."))

    def seed_projects(self):
        projects = [
            {
                "title": "Neural Style Transfer Studio",
                "description": "Real-time artistic style transfer using PyTorch and a Django + React pipeline. Sub-second inference on CPU.",
                "tech": ["PyTorch", "Django", "React", "WebSockets"],
                "category": "AI/ML",
                "github": "https://github.com/rectifier_4321",
                "demo": "",
                "featured": True,
                "sort_order": 1,
            },
            {
                "title": "Distributed URL Shortener",
                "description": "Scalable URL shortener with consistent hashing, Redis caching, and Postgres sharding. 50k req/s benchmark.",
                "tech": ["Go", "Redis", "Postgres", "Docker"],
                "category": "Systems",
                "github": "https://github.com/rectifier_4321",
                "demo": "",
                "featured": True,
                "sort_order": 2,
            },
            {
                "title": "Sentiment-Aware Chat Dashboard",
                "description": "Live chat analytics with transformer-based sentiment scoring streamed to a React dashboard.",
                "tech": ["FastAPI", "Transformers", "React", "Recharts"],
                "category": "AI/ML",
                "github": "https://github.com/rectifier_4321",
                "demo": "",
                "featured": True,
                "sort_order": 3,
            },
            {
                "title": "DevPortfolio CMS",
                "description": "Headless CMS for developer portfolios with markdown blog, tag system, and GitHub sync.",
                "tech": ["Django REST", "React", "Postgres"],
                "category": "Full-Stack",
                "github": "https://github.com/rectifier_4321",
                "demo": "",
                "featured": False,
                "sort_order": 4,
            },
            {
                "title": "Aurora UI Kit",
                "description": "Tailwind + Framer Motion component library with glassmorphism and aurora gradients.",
                "tech": ["React", "Tailwind", "Framer Motion"],
                "category": "Frontend",
                "github": "https://github.com/rectifier_4321",
                "demo": "",
                "featured": False,
                "sort_order": 5,
            },
            {
                "title": "Vector Search Playground",
                "description": "Interactive vector DB explorer — pgvector under the hood, FAISS for benchmarking.",
                "tech": ["pgvector", "FAISS", "FastAPI", "Next.js"],
                "category": "AI/ML",
                "github": "https://github.com/rectifier_4321",
                "demo": "",
                "featured": False,
                "sort_order": 6,
            },
        ]
        for payload in projects:
            Project.objects.update_or_create(title=payload["title"], defaults=payload)

    def seed_skills(self):
        skills = [
            ("React", 92, "Frontend"),
            ("TypeScript", 88, "Frontend"),
            ("Tailwind", 90, "Frontend"),
            ("Framer Motion", 80, "Frontend"),
            ("Django / DRF", 90, "Backend"),
            ("FastAPI", 82, "Backend"),
            ("PostgreSQL", 85, "Backend"),
            ("Redis", 75, "Backend"),
            ("PyTorch", 85, "AI/ML"),
            ("Transformers", 80, "AI/ML"),
            ("LangChain", 78, "AI/ML"),
            ("scikit-learn", 82, "AI/ML"),
            ("Docker", 80, "DevOps"),
            ("GitHub Actions", 78, "DevOps"),
            ("AWS", 72, "DevOps"),
            ("Linux", 85, "DevOps"),
        ]
        for index, (name, level, category) in enumerate(skills, start=1):
            Skill.objects.update_or_create(
                name=name,
                defaults={"level": level, "category": category, "sort_order": index},
            )

    def seed_timeline(self):
        entries = [
            {
                "entry_type": "education",
                "title": "Bachelor's in Computer Applications",
                "org": "Foundation",
                "period": "2021 — 2024",
                "description": "Built foundations in DSA, web engineering, and machine learning.",
                "details": [],
                "sort_order": 1,
            },
            {
                "entry_type": "experience",
                "title": "Open Source Contributor",
                "org": "GitHub",
                "period": "2023 — Present",
                "description": "Contributing to Python, ML tooling, and developer experience projects.",
                "details": [],
                "sort_order": 2,
            },
            {
                "entry_type": "education",
                "title": "Master of Computer Applications (MCA)",
                "org": "Currently pursuing",
                "period": "2024 — Present",
                "description": "Deep focus on AI systems, distributed computing, and product engineering.",
                "details": ["Advanced ML & Deep Learning", "Distributed Systems", "Database Internals"],
                "sort_order": 3,
            },
            {
                "entry_type": "project",
                "title": "Launched DevPortfolio Platform",
                "org": "Personal",
                "period": "2025",
                "description": "End-to-end Django REST + React platform with AI experiments and system design blog.",
                "details": ["Designed REST API surface", "Implemented AI inference endpoint", "Animated dark-first UI"],
                "sort_order": 4,
            },
        ]
        for payload in entries:
            TimelineItem.objects.update_or_create(title=payload["title"], defaults=payload)

    def seed_blogs(self):
        posts = [
            {
                "slug": "designing-for-scale",
                "title": "Designing Systems That Scale Without Breaking",
                "excerpt": "From caching layers to consistent hashing — pragmatic patterns for building APIs that grow with your users.",
                "tags": ["Scalability", "Caching", "Architecture"],
                "published_at": date(2025, 3, 12),
                "reading_time": "8 min read",
                "sort_order": 1,
                "content": """## The mental model

Scalability isn't a single switch — it's a series of small, deliberate trade-offs.

### 1. Cache the hot path

Identify the 5% of queries that serve 80% of traffic. Cache them aggressively.

### 2. Read replicas before sharding

Most systems never need sharding. A read replica buys you more headroom.

### 3. Queue the slow stuff

Anything > 100ms goes to a worker. Users feel responsiveness, not throughput.""",
            },
            {
                "slug": "vector-databases-101",
                "title": "Vector Databases 101: pgvector vs FAISS",
                "excerpt": "A no-nonsense comparison of the two tools I reach for when building semantic search.",
                "tags": ["AI/ML", "Database", "Search"],
                "published_at": date(2025, 2, 4),
                "reading_time": "6 min read",
                "sort_order": 2,
                "content": """## When embeddings meet storage

Both pgvector and FAISS solve nearest-neighbor search — but they live in different worlds.

### TL;DR

- pgvector — operational, transactional, great default
- FAISS — analytical, blazing fast, in-process

Pick pgvector for products. Pick FAISS for batch jobs and benchmarks.""",
            },
            {
                "slug": "the-rest-api-i-wish-i-had-built-first",
                "title": "The REST API I Wish I Had Built First",
                "excerpt": "Lessons from shipping a Django REST Framework API that I'd repeat on day one of any new project.",
                "tags": ["Django", "API Design", "DX"],
                "published_at": date(2025, 1, 18),
                "reading_time": "5 min read",
                "sort_order": 3,
                "content": """## Conventions over creativity

Your future self will thank you for boring, predictable URLs.

### Pagination is not optional

Always paginate. Always.""",
            },
        ]
        for payload in posts:
            BlogPost.objects.update_or_create(slug=payload["slug"], defaults=payload)
