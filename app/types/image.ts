export interface ImageItem {
  uuid?: string;       // optional, since backend may return UUID
  image_url: string;
  caption: string;
  tags?: string[];
}
