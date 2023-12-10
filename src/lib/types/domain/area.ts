export interface Area {
  id: number;
  title: string;
  description: string;
  image: FileList | undefined;
  imageSrc: string;
  parentId: number;
}
