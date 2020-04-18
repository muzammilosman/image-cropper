import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private uploadService: UploadService) { }

  galleryImages: any;
  imgLoaded = false;

  ngOnInit() {
    this.uploadService.getImages().subscribe((res) => {
      this.galleryImages = res;
      this.imgLoaded = true;
      console.log('in comp', this.galleryImages);
    });
  }

}
