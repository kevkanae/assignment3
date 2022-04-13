export interface IResponse {
  hits: HitsArray[];
  page: number;
}

interface HitsArray {
  created_at: string;
  title?: null;
  url?: null;
  author: string;
  story_url: string;
}
