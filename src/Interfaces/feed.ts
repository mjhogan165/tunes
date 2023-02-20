export interface ISearchResult {
  artist: string;
  title: string;
  id: string;
}

export interface INewTune {
  artist: string;
  title: string;
  img?: string;
  comment?: string;
  id: string;
  createdBy: string;
}
