import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, tap } from 'rxjs';
import { AddImageComponent } from 'src/app/modals/add-image/add-image.component';
import { ISection } from 'src/app/models/section';
import { SectionService } from 'src/app/services/section.service';
@Component({
  selector: 'app-view-edit-section',
  templateUrl: './view-edit-section.component.html',
  styleUrls: ['./view-edit-section.component.scss'],
})
export class ViewEditSectionComponent implements OnInit {
  // services
  public dialog: MatDialog = inject(MatDialog);
  private sectionService: SectionService = inject(SectionService);
  firestore: Firestore = inject(Firestore);

  // component state
  sections$: Observable<any[]> | undefined;
  editMode: boolean = false;
  editSection: string | null = null;

  ngOnInit(): void {
    const aCollection = collection(this.firestore, 'section');
    this.sections$ = collectionData(aCollection, { idField: 'docId' }).pipe(
      map((data) => data.sort((a: any, b: any) => b.order - a.order)),
      tap((data) => console.log(data))
    );
  }

  toggleEditMode(section: ISection) {
    if (this.editMode) {
      this.save(section);
      this.editSection = null;
      this.editMode = false;
      return;
    }

    this.editSection = section.id;
    this.editMode = !this.editMode;
    return;
  }

  editImage(image: any) {
    const res = this.dialog.open(AddImageComponent, {
      data: image,
    });
  }

  async save(section: any) {
    await this.sectionService.save(section);
  }

  async delete(section: any) {
    await this.sectionService.delete(section.docId);
  }
}
