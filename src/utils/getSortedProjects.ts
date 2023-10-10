import type { CollectionEntry } from "astro:content";

const getSortedProjects = (projects: CollectionEntry<"projects">[]) =>
  projects
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.pubDateTime).getTime() / 1000) -
        Math.floor(new Date(a.data.pubDateTime).getTime() / 1000)
    );

export default getSortedProjects;
