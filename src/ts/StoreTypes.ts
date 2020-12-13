// ↓ 取得用のデータ型
export interface Posts {
  posts?: Post[];
}

export interface Post {
  postId: number;
  userId: number;
  title: string;
  text: string;
  registTime: Date;
  registTimeYYYYMMDD: string;
  registTimeMMDD: string;
  imageIdList: PostImages[];
  imageUrlList: PostImagesUrls[];
  tagNameList: PostTagNames[];
}

export interface PostImages {
  imageId: number;
}

export interface PostImagesUrls {
  imageUrl: string;
}

export interface PostTagNames {
  tagName: string;
}

export interface Events {
  events?: Event[];
}

export interface Event {
  id: number;
  title: string;
  body: string;
}

export interface SideMenu {
  isOpen: boolean;
}

export interface MainVisual {
  isShow: boolean;
}

export interface Auth {
  isLogin: boolean;
  familyName?: string;
  message?: string;
}
