import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { documentId, updateDoc } from 'firebase/firestore';
import { generateRandomId } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class QuerysideService {
  private cloudinaryUrl =
    'https://api.cloudinary.com/v1_1/denerup17/image/upload';

  private httpClient: HttpClient = inject(HttpClient);
  private store: Firestore = inject(Firestore);

  uploadImage(imageData: any): Observable<any> {
    return this.httpClient.post(`${this.cloudinaryUrl}`, imageData);
  }

  async addSectionToCollection(document: any, collectionName: string) {
    console.log(document);

    if (!document.docId) {
      const collectionRef = collection(this.store, collectionName);
      document.id = generateRandomId(12);
      return await addDoc(collectionRef, { ...document });
    } else {
      const docRef = doc(this.store, collectionName, document.docId);
      return await updateDoc(docRef, { ...document });
    }
  }

  async deleteDocFromCollection(docId: any, collectionName: string) {
    const docRef = doc(this.store, collectionName, docId);
    return await deleteDoc(docRef);
  }

  async getSection(docId: string, collectionName: string) {
    return (await getDoc(doc(this.store, collectionName, docId))).data();
  }
}
