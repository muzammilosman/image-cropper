import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  updatePreview(images) {
    this.messageSource.next(images);
  }

  getImages() {
    console.log('Fun workin');
    return this.httpClient.get('http://localhost:3000/gallery');
  }

  uploadImages(images) {
    const fileData = new FormData();

    for (let i = 0; i < 4; i++) {
      fileData.append('cropImage', images[i]);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.httpClient.post('http://localhost:3000/upload', fileData, httpOptions)
  }


  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
        type: 'image/jpg'
    });
  }
}
