import { IUser } from './AuthTypes';
import { IPost } from './PostTypes';
import ISuccess from './SuccessTypes';

export interface ILikeResponse extends ISuccess {
  data: {
    likes: ILike[];
  }
}

export interface ILike {
  idx: number;
  user: IUser;
  post: IPost;
}