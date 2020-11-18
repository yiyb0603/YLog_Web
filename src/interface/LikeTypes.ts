import ISuccessTypes from "./SuccessTypes";

export interface ILikeResponseTypes extends ISuccessTypes {
  data: {
    likes: ILikeTypes[];
  }
}

export interface ILikeTypes {
  idx: number;
  user_idx: number;
  post_idx: number;
}