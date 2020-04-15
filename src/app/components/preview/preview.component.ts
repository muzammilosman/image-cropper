import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  previewImages: string;
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploadService.currentMessage.subscribe(message => {
      console.log('subscription success in preview comp:', message);
      this.previewImages = message;
    });
  }


}
