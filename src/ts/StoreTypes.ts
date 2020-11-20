// ↓ 取得用のデータ型
export interface Events {
  events?: Event[];
}

export interface Event {
  id: number;
  title: string;
  body: string;
}
