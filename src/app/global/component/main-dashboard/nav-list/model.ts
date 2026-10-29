export interface NavListItem {
  name: string;
  route: string[];
  isVisible: boolean;
  icon?: string;
  children?: NavListItem[];
}
