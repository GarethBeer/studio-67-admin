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

    if (!document.id) {
      const collectionRef = collection(this.store, collectionName);
      document.id = this.generateRandomId(12);
      return await addDoc(collectionRef, { ...document });
    } else {
      const docRef = doc(this.store, collectionName, document.id);
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

  generateRandomId(length = 8) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
}
