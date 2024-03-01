import { Injectable, inject } from '@angular/core';
import { QuerysideService } from './queryside.service';
import { ISection } from '../models/section';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private querysideService: QuerysideService = inject(QuerysideService);

  constructor() {}

  public async save(section: ISection) {
    const res = await this.querysideService.addSectionToCollection(
      section,
      'section'
    );
    return;
  }

  public delete(sectionId: string) {
    console.log(sectionId);
    const res = this.querysideService.deleteDocFromCollection(
      sectionId,
      'section'
    );
    console.log(res);
  }
}
