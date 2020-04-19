import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CropperComponent } from './components/cropper/cropper.component';
import { PreviewComponent } from './components/preview/preview.component';
import { UploadComponent } from './components/upload/upload.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'upload', pathMatch: 'full'},
  {path: 'upload', component: UploadComponent},
  {path: 'preview', component: PreviewComponent },
  {path: 'gallery', component: GalleryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CropperComponent,
    PreviewComponent,
    UploadComponent,
    GalleryComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
