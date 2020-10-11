import ISuccessTypes from "./SuccessTypes";

export interface IReleaseListResponseTypes extends ISuccessTypes {
  data: {
    releases: IReleaseTypes[];
  }
}

export interface IReleaseResponseTypes extends ISuccessTypes {
  data: {
    release: IReleaseTypes;
  }
}

export interface IReleaseTypes {
  idx?: number;
  title?: string;
  contents?: string;
  created_at?: Date | string;
  updated_at?: Date | null;
  writer?: string;
}