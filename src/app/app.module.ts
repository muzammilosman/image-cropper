import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppComponent } from './app.component';
import { CropperComponent } from './components/cropper/cropper.component';
import { PreviewComponent } from './components/preview/preview.component';
import { UploadComponent } from './components/upload/upload.component';

const appRoutes: Routes = [
  {path: '', component: UploadComponent},
  {path: 'preview', component: PreviewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CropperComponent,
    PreviewComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2ImgMaxModule,
    ImageCropperModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
