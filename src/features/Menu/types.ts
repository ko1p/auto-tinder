export interface Links {
  text: string;
  path: string;
  action?: 'logout';
}

export interface MenuState {
  view: 'tinder' | 'list';
}
