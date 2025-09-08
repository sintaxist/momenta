export interface projectType {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
}

export type projectVideo = {
  title: string;
  video: { hls: string; mp4: string };
  poster?: string;
  demoUrl: string;
  description?: string;
};