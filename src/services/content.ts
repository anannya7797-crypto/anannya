import { useQuery } from "@tanstack/react-query";

import { api, endpoints, withFallback } from "@/services/api";
import {
  blogs as mockBlogs,
  projects as mockProjects,
  skills as mockSkills,
  timeline as mockTimeline,
  type BlogPost,
  type Project,
  type Skill,
  type TimelineItem,
} from "@/data/mock";

export type ResourceResult<T> = {
  data: T;
  isMock: boolean;
};

async function fetchProjects(): Promise<ResourceResult<Project[]>> {
  return withFallback(
    async () => {
      const response = await api.get<Project[]>(endpoints.projects);
      return response.data.map((project) => ({
        ...project,
        id: String(project.id),
      }));
    },
    mockProjects,
  );
}

async function fetchSkills(): Promise<ResourceResult<Skill[]>> {
  return withFallback(
    async () => {
      const response = await api.get<Skill[]>(endpoints.skills);
      return response.data;
    },
    mockSkills,
  );
}

async function fetchTimeline(): Promise<ResourceResult<TimelineItem[]>> {
  const response = await api.get<TimelineItem[]>(endpoints.timeline);
  return {
    data: response.data.map((item) => ({
      ...item,
      id: String(item.id),
    })),
    isMock: false,
  };
}

async function fetchBlogs(): Promise<ResourceResult<BlogPost[]>> {
  return withFallback(
    async () => {
      const response = await api.get<BlogPost[]>(endpoints.blogs);
      return response.data;
    },
    mockBlogs,
  );
}

export function useProjectsResource() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

export function useSkillsResource() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

export function useTimelineResource() {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: fetchTimeline,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 2,
  });
}

export function useBlogsResource() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}
