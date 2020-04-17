import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  previewImages: any;
  blobImages: any = [];
  imagesName = ['horizontal.jpg', 'vertical.jpg', 'small.jpg', 'gallery.jpg'];
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploadService.currentMessage.subscribe(message => {
      console.log('subscription success in preview comp:', message);
      this.previewImages = message;
    });
  }

  uploadImages() {
    this.uploadService.uploadImages(this.blobImages).subscribe((data) => {
      console.log('Response from api:', data);
    });
  }

  convertFile() {
    this.previewImages.forEach((element, i) => {
      const blobImage = this.uploadService.dataURItoBlob(element);
      this.blobImages[i] = new File([blobImage], this.imagesName[i], { type: 'image/jpeg' });
    });
    console.log('blobs:', this.blobImages);
    this.uploadImages();
  }


}
