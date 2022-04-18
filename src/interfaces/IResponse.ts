export interface IResponse {
  hits: HitsObject[];
  page: number;
}

export interface HitsObject {
  created_at: string;
  title: null;
  author: string;
  story_url: string;
}
