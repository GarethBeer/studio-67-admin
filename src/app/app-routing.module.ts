import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSectionComponent } from './components/create-section/create-section.component';
import { ViewEditSectionComponent } from './components/view-edit-section/view-edit-section.component';
import { ImageLibraryComponent } from './components/image-library/image-library.component';

const routes: Routes = [
  {
    path: 'create-section',
    component: CreateSectionComponent,
  },
  {
    path: 'create-section/:id',
    component: CreateSectionComponent,
  },
  {
    path: 'view-edit-section',
    component: ViewEditSectionComponent,
  },
  {
    path: 'image-library',
    component: ImageLibraryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
