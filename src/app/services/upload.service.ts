import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  updatePreview(images) {
    this.messageSource.next(images);
  }

  subscribeMessage() {
    this.currentMessage.subscribe(message => console.log('subscription success:', message));
  }
}
