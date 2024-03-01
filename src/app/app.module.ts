import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CloudinaryModule } from '@cloudinary/ng';
// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// components
import { CreateSectionComponent } from './components/create-section/create-section.component';
import { ViewEditSectionComponent } from './components/view-edit-section/view-edit-section.component';
import { ImageLibraryComponent } from './components/image-library/image-library.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AddImageComponent } from './modals/add-image/add-image.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSectionComponent,
    ViewEditSectionComponent,
    ImageLibraryComponent,
    AddImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    //material
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,

    // firebase
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'studio67-35e87',
        appId: '1:516073702238:web:8765c463bb7971686345cf',
        storageBucket: 'studio67-35e87.appspot.com',
        apiKey: 'AIzaSyDgf6uWyG7UCQtgV8xJaLPlDoprz82vtsk',
        authDomain: 'studio67-35e87.firebaseapp.com',
        messagingSenderId: '516073702238',
        measurementId: 'G-YGETES4YG7',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // cloudinary
    CloudinaryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
