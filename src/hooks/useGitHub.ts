import { useEffect, useState } from "react";

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  following: number;
  topRepos: { name: string; stars: number; description: string | null; url: string; language: string | null }[];
  loading: boolean;
  error: string | null;
};

const USERNAME = "rectifier_4321";

export function useGitHub() {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    topRepos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");
        const user = await userRes.json();
        const repos = await reposRes.json();
        if (!alive) return;
        const top = (repos as any[])
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)
          .map((r) => ({
            name: r.name,
            stars: r.stargazers_count,
            description: r.description,
            url: r.html_url,
            language: r.language,
          }));
        setStats({
          publicRepos: user.public_repos ?? 0,
          followers: user.followers ?? 0,
          following: user.following ?? 0,
          topRepos: top,
          loading: false,
          error: null,
        });
      } catch (e: any) {
        if (alive) setStats((s) => ({ ...s, loading: false, error: e.message }));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return stats;
}
