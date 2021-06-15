import ISuccess from "./SuccessTypes";

export interface ILikeResponseTypes extends ISuccess {
  data: {
    likes: ILikeTypes[];
  }
}

export interface ILikeTypes {
  idx: number;
  user_idx: number;
  post_idx: number;
}