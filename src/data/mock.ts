// Realistic placeholder data — easily swappable when Django API is live.

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "AI/ML" | "Full-Stack" | "Systems" | "Frontend";
  github?: string;
  demo?: string;
  featured?: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Neural Style Transfer Studio",
    description: "Real-time artistic style transfer using PyTorch and a Django + React pipeline. Sub-second inference on CPU.",
    tech: ["PyTorch", "Django", "React", "WebSockets"],
    category: "AI/ML",
    github: "https://github.com/rectifier_4321",
    demo: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Distributed URL Shortener",
    description: "Scalable URL shortener with consistent hashing, Redis caching, and Postgres sharding. 50k req/s benchmark.",
    tech: ["Go", "Redis", "Postgres", "Docker"],
    category: "Systems",
    github: "https://github.com/rectifier_4321",
    featured: true,
  },
  {
    id: "3",
    title: "Sentiment-Aware Chat Dashboard",
    description: "Live chat analytics with transformer-based sentiment scoring streamed to a React dashboard.",
    tech: ["FastAPI", "Transformers", "React", "Recharts"],
    category: "AI/ML",
    github: "https://github.com/rectifier_4321",
    demo: "#",
    featured: true,
  },
  {
    id: "4",
    title: "DevPortfolio CMS",
    description: "Headless CMS for developer portfolios with markdown blog, tag system, and GitHub sync.",
    tech: ["Django REST", "React", "Postgres"],
    category: "Full-Stack",
    github: "https://github.com/rectifier_4321",
  },
  {
    id: "5",
    title: "Aurora UI Kit",
    description: "Tailwind + Framer Motion component library with glassmorphism and aurora gradients.",
    tech: ["React", "Tailwind", "Framer Motion"],
    category: "Frontend",
    github: "https://github.com/rectifier_4321",
    demo: "#",
  },
  {
    id: "6",
    title: "Vector Search Playground",
    description: "Interactive vector DB explorer — pgvector under the hood, FAISS for benchmarking.",
    tech: ["pgvector", "FAISS", "FastAPI", "Next.js"],
    category: "AI/ML",
    github: "https://github.com/rectifier_4321",
  },
];

export type Skill = { name: string; level: number; category: "Frontend" | "Backend" | "AI/ML" | "DevOps" };
export const skills: Skill[] = [
  { name: "React", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "Tailwind", level: 90, category: "Frontend" },
  { name: "Framer Motion", level: 80, category: "Frontend" },
  { name: "Django / DRF", level: 90, category: "Backend" },
  { name: "FastAPI", level: 82, category: "Backend" },
  { name: "PostgreSQL", level: 85, category: "Backend" },
  { name: "Redis", level: 75, category: "Backend" },
  { name: "PyTorch", level: 85, category: "AI/ML" },
  { name: "Transformers", level: 80, category: "AI/ML" },
  { name: "LangChain", level: 78, category: "AI/ML" },
  { name: "scikit-learn", level: 82, category: "AI/ML" },
  { name: "Docker", level: 80, category: "DevOps" },
  { name: "GitHub Actions", level: 78, category: "DevOps" },
  { name: "AWS", level: 72, category: "DevOps" },
  { name: "Linux", level: 85, category: "DevOps" },
];

export type TimelineItem = {
  id: string;
  type: "education" | "experience" | "project";
  title: string;
  org: string;
  period: string;
  description: string;
  details?: string[];
};

export const timeline: TimelineItem[] = [
  {
    id: "t1",
    type: "education",
    title: "Master of Computer Applications (MCA)",
    org: "Currently pursuing",
    period: "2024 — Present",
    description: "Deep focus on AI systems, distributed computing, and product engineering.",
    details: ["Advanced ML & Deep Learning", "Distributed Systems", "Database Internals"],
  },
  {
    id: "t2",
    type: "project",
    title: "Launched DevPortfolio Platform",
    org: "Personal",
    period: "2025",
    description: "End-to-end Django REST + React platform with AI experiments and system design blog.",
    details: ["Designed REST API surface", "Implemented AI inference endpoint", "Animated dark-first UI"],
  },
  {
    id: "t3",
    type: "experience",
    title: "Open Source Contributor",
    org: "GitHub",
    period: "2023 — Present",
    description: "Contributing to Python, ML tooling, and developer experience projects.",
  },
  {
    id: "t4",
    type: "education",
    title: "Bachelor's in Computer Applications",
    org: "Foundation",
    period: "2021 — 2024",
    description: "Built foundations in DSA, web engineering, and machine learning.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readingTime: string;
  content: string;
};

export const blogs: BlogPost[] = [
  {
    slug: "designing-for-scale",
    title: "Designing Systems That Scale Without Breaking",
    excerpt: "From caching layers to consistent hashing — pragmatic patterns for building APIs that grow with your users.",
    tags: ["Scalability", "Caching", "Architecture"],
    date: "2025-03-12",
    readingTime: "8 min read",
    content: `## The mental model

Scalability isn't a single switch — it's a series of *small, deliberate* trade-offs.

> "Make it work, make it right, make it fast." — Kent Beck

### 1. Cache the hot path

Identify the 5% of queries that serve 80% of traffic. Cache them aggressively.

\`\`\`python
from django.core.cache import cache

def get_project(pk):
    key = f"project:{pk}"
    if (data := cache.get(key)) is None:
        data = Project.objects.get(pk=pk)
        cache.set(key, data, timeout=300)
    return data
\`\`\`

### 2. Read replicas before sharding

Most systems never need sharding. A read replica buys you 10× headroom.

### 3. Queue the slow stuff

Anything > 100ms goes to a worker. Users feel responsiveness, not throughput.`,
  },
  {
    slug: "vector-databases-101",
    title: "Vector Databases 101: pgvector vs FAISS",
    excerpt: "A no-nonsense comparison of the two tools I reach for when building semantic search.",
    tags: ["AI/ML", "Database", "Search"],
    date: "2025-02-04",
    readingTime: "6 min read",
    content: `## When embeddings meet storage

Both pgvector and FAISS solve nearest-neighbor search — but they live in different worlds.

\`\`\`sql
CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops);
\`\`\`

### TL;DR

- **pgvector** — operational, transactional, great default
- **FAISS** — analytical, blazing fast, in-process

Pick pgvector for products. Pick FAISS for batch jobs and benchmarks.`,
  },
  {
    slug: "the-rest-api-i-wish-i-had-built-first",
    title: "The REST API I Wish I Had Built First",
    excerpt: "Lessons from shipping a Django REST Framework API that I'd repeat on day one of any new project.",
    tags: ["Django", "API Design", "DX"],
    date: "2025-01-18",
    readingTime: "5 min read",
    content: `## Conventions over creativity

Your future self will thank you for boring, predictable URLs.

\`\`\`
GET    /api/projects/
POST   /api/projects/
GET    /api/projects/{id}/
PATCH  /api/projects/{id}/
\`\`\`

### Pagination is not optional

Always paginate. Always.`,
  },
];
