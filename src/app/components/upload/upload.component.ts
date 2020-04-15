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
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.imagePreview = reader.result;
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
