import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import Cropper from 'cropperjs';


@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.css']
})
export class CropperComponent implements AfterViewInit {

    @ViewChild('upimage', { static: false })
    public imageElement: ElementRef;

    notFirstUpload: boolean;

  imagePreviewD: any;
  @Input() set imagePreview(val) {
    console.log('Value changed');
    this.imagePreviewD = val;
    if (this.notFirstUpload) {
      this.cropper.destroy();
      this.cropper.replace(this.imagePreviewD);
    }
  }

  @Input() cropDimension: any;

  @Output() croppedImage = new EventEmitter();

  public imageDestination: string;

  private cropper: Cropper;

  constructor() {
    this.notFirstUpload = false;
  }

  ngAfterViewInit() {
    this.initiateCropper();
    this.notFirstUpload = true;
  }


initiateCropper() {
    console.log('After view init set', this.imageElement.nativeElement);
    this.cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable: false,
        scalable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        viewMode: 3,
        ready: () => {
            this.cropper.setCropBoxData({
                left: 0,
                top: 0,
                width: this.cropDimension.width,
                height: this.cropDimension.height
            });
        },

        cropstart: (event) => {
            console.log('Crop start executed', event.detail);
            if (event.detail.action === 'crop') {
                event.preventDefault();
            }
        },

        crop: () => {
            const canvas = this.cropper.getCroppedCanvas();
            this.imageDestination = canvas.toDataURL('image/png');
            this.croppedImage.emit(this.imageDestination);
        }
    });
}


}
