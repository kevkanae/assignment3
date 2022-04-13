export interface IHome {
  page: number;
  setNewPage: React.Dispatch<React.SetStateAction<number>>;
  data: any;
  // clickedNextPage: (newPage: number) => void;
}
