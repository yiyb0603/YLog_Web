import { IUser } from './AuthTypes';
import ISuccess from './SuccessTypes';

export interface IReleaseListResponse extends ISuccess {
  data: {
    releases: IRelease[];
  }
}

export interface IReleaseResponse extends ISuccess {
  data: {
    release: IRelease;
  }
}

export interface IReleaseDto {
  idx?: number;
  title: string;
  contents: string;
}

export interface IRelease {
  idx?: number;
  title?: string;
  contents?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string | null;
  user?: IUser;
}