export interface ISection {
  id: string;
  section_title: string;
  display_title: boolean;
  section_images: ISectionImage[];
  background: 'white' | 'black';
  order: number;
  active: boolean;
}
export class Section {
  id: string = '';
  section_title: string = '';
  display_title: boolean = false;
  section_images: ISectionImage[] = [];
  background: 'white' | 'black' = 'white';
  order: number = 0;
  active: boolean = true;
  updatedBy: string = '';
  createdOn: string = '';
}

export interface ISectionImage {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  sold: boolean;
  order: number;
}
export class SectionImage {
  id: string = '';
  name: string = '';
  description: string = '';
  price: string = '';
  imageUrl: string = '';
  sold: boolean = false;
  order: number = 0;
  active: boolean = true;
  updatedBy: string = '';
  createdOn: string = '';
}
