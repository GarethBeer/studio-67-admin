import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
  Output,
} from '@angular/core';
import { ISection, ISectionImage, Section } from 'src/app/models/section';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { Cloudinary } from '@cloudinary/url-gen';
import { QuerysideService } from 'src/app/services/queryside.service';
import { MatDialog } from '@angular/material/dialog';
import { AddImageComponent } from 'src/app/modals/add-image/add-image.component';
import { ActivatedRoute } from '@angular/router';
import { generateRandomId } from 'src/app/utils/utils';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss'],
})
export class CreateSectionComponent implements OnInit {
  // services
  private querysideService: QuerysideService = inject(QuerysideService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public dialog: MatDialog = inject(MatDialog);

  // component state
  @Input() newSection: ISection = new Section();
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() nested: boolean = false;

  file: any = null;
  imageUrl: string | null = null;
  fileName: string | null = null;
  todaysDate: string | undefined;

  ngOnInit(): void {
    const cld = new Cloudinary({ cloud: { cloudName: 'denerup17' } });
  }

  uploadImage(image: File, name: string) {
    const data = new FormData();
    data.append('file', image);
    data.append('public_id', `gallery/${name}`);
    data.append('upload_preset', 'section');
    return this.querysideService.uploadImage(data);
  }

  loadImageDialog(image: ISectionImage | null) {
    const dialogRef = this.dialog.open(AddImageComponent, {
      data: image,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((data: any) => {
          if (data && !data.file) {
            return of([null, data]);
          }
          console.log(data);
          if (data && data?.imageData) {
            const uploadImage$ = this.uploadImage(
              data.file,
              data.imageData.name
            );
            data.imageData.id = generateRandomId(12);
            const dialogData$ = of(data);
            return forkJoin([uploadImage$, dialogData$]);
          }

          return of([]);
        }),
        map((res) => {
          console.log('res');
          if (res.length > 0) {
            const [uploadData, dialogData] = res;
            const imageUrl = uploadData
              ? uploadData?.public_id || uploadData?.url
              : dialogData.imageData.imageUrl;
            return { ...dialogData.imageData, imageUrl };
          }
          return null;
        })
      )
      .subscribe((result) => {
        console.log(result, this.newSection);
        if (result) {
          const ind = this.newSection.section_images.findIndex(
            (image: ISectionImage) => image.id === result.id
          );
          if (ind > -1) {
            this.newSection.section_images.splice(ind, 1, result);
          } else {
            this.newSection.section_images.push(result);
          }
        }
      });
  }

  async save(section: ISection) {
    if (!this.nested) {
      const res = await this.querysideService.addSectionToCollection(
        this.newSection,
        'section'
      );
    } else {
      this.saved.emit(section);
    }
  }

  get disabled() {
    return !(
      Boolean(this.newSection.section_title) &&
      Boolean(this.newSection.background)
    );
  }
}
