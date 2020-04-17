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

  subscribeMessage() {
    this.currentMessage.subscribe(message => console.log('subscription success:', message));
  }

  uploadImages(images) {
    const fileData = new FormData();
    fileData.append('cropImage', images[0]);
    const httpOptions = {
      headers: {
        'Content-Type':  'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
        }
    };
    return this.httpClient.post('localhost:3000/api/upload', fileData);
    // return this.httpClient.get('localhost:8080/sample');
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
