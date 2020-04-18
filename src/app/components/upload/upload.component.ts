import { Component, AfterViewInit, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  imagePreview: any;

  dimensions: any;
  imagesForPreview: Array<any> = [];

  constructor(private router: Router, private uploadService: UploadService) {
    this.dimensions = [{
            width: 750,
            height: 450
        },
        {
            width: 365,
            height: 450
        },
        {
            width: 365,
            height: 212
        },
        {
            width: 380,
            height: 380
        }
    ];
  }

  ngOnInit() {
  }

getImagePreview(event) {
    const Img = new Image();
    Img.src = URL.createObjectURL(event.target.files[0]);

    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      if (height === 1024) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
      } else {
        alert("please upload an image with the right dimension")
      }
    };
}

cropPreview(event, i) {
    this.imagesForPreview[i] = event;
}

submitPreview() {
    console.log('Preview images', this.imagesForPreview);
    this.uploadService.updatePreview(this.imagesForPreview);
    this.router.navigate(['/preview']);
}



}
