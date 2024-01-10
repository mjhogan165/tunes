import { User } from "./user";

export interface ISearchResult {
  artist: string;
  title: string;
  id: string;
}

export interface INewTune {
  id?: number;
  artist: string;
  title: string;
  img?: string;
  createdBy: User;
  createdById: number;
  comment?: string;
  taggedUserIds?: number[];
  tagged?: User[];
}
