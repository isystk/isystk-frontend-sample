// ↓ 取得用のデータ型

export interface Consts {
  name?: string;
  data?: Const[];
}

export interface Const {
  code: number;
  text: string;
}

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
  imageList: PostImages[];
  tagNameList: PostTagNames[];
}

export interface PostImages {
  imageId: number;
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

export interface User {
	familyName?: string;
	name?: string;
	familyNameKana?: string;
	nameKana?: string;
	email?: string;
	password?: string;
	passwordConf?: string;
	sex?: number;
	zip?: string;
	prefectureId?: number;
	area?: string;
	address?: string;
	building?: string;
	tel?: string;
	birthday?: Date;
}

export interface Remind {
  isValid: boolean;
}
