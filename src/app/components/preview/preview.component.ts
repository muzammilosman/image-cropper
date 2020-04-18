import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  previewImages: any;
  blobImages: any = [];
  imagesName = ['horizontal.jpg', 'vertical.jpg', 'small.jpg', 'gallery.jpg'];
  dimensionNames = ['Horizontal (755 x 450)', 'Vertical (365 x 450)', 'Horizontal Small (365 x 212)', 'Gallery (380 x 380)'];
  constructor(private uploadService: UploadService, private router: Router) { }

  ngOnInit() {
    this.uploadService.currentMessage.subscribe(message => {
      console.log('subscription success in preview comp:', message);
      this.previewImages = message;
    });
  }

  uploadImages() {
    this.uploadService.uploadImages(this.blobImages).subscribe(res => {
      alert('Cropped Images successfully uploaded');
      this.router.navigate(['/gallery']);
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
