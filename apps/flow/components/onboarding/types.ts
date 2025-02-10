export type TemplateType =
  | {
      id: string;
      title: string;
      screenshot: string;
      demoUrl: string;
      views: number;
      keywords: string;
      likes: number;
    }
  | "empty";
