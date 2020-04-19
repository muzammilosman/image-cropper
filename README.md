# Image Cropper

Image cropper is an application built using Angular 8 on the client side and ExpressJS for the server side. The application lets you upload images of the dimension 1024x1024, crops the image into four different dimensions, previews the cropped images and finally upload it to a local directory

## Installation and development server

Clone the repository and install all the dependencies in the client-side by running the command `npm i`. Run `ng serve` for an angular dev server. Navigate to `http://localhost:4200/`. 

```sh   
$ cd image-upload
$ npm i
$ ng serve
```

In a new terminal, navigate to `server/image-upload-backend` directory and run `npm i`. Once, the server side dependencies are installed, run the command `node index.js` in order to start the backend server in port `localhost:3000`

```
$ cd server/image-upload-backend
$ npm i
$ node index.js
```

## Working

The application running on `localhost:4200` lets us upload a file of dimension 1024x1024, if the dimensions don't satisfy for the image in the input field, the image wont be loaded for cropping.

Once the image is image is loaded, four different croppers are initiated with dimensions Horizontal(750x450), Vertical(365x450), Horizontal Small(365x212), Gallery(380x380). The preview of cropped images can be viewed when clicking the preview button.

The cropped images are uploaded to a local folder `server/image-upload-backend/uploads`. The application is then redirected to the gallery where all the uploaded images can be viewed


## Dependencies

- ### Cropperjs
    The application uses `cropperjs` to crop the images in the client side. Full documentation of cropper js can be found [here](https://fengyuanchen.github.io/cropperjs/).

- ### Multer
    The cropped images to be uploaded are sent to the server side via FormData. Multer is a middleware in nodejs for handling `multipart/form-data` requests. Full documentation for multer can be found [here](https://github.com/expressjs/multer#readme).


## Components

- ### `UploadComponent`
    This component has an input file which accepts files. If the image dimensions match 1024x1024 which is accessed using File Reader, the `CropperComponent` template is rendered after passing the input image through `@Input` decorator. When the preview button is clicked, the application is redirected to `PreviewComponent` with the array of images emitted from `CropperComponent`.

- ### `CropperComponent`
    When a change in files received from `UploadComponent` is detected, croppers are initiated with the specified dimensions, the cropped images are emitted to the parent component (`UploadComponent`) via `@Output` decorator

- ### `PreviewComponent`
    The cropped images are received from `UploadComponent` and are displayed for preview before uploading to the server. Once the UPLOAD button is clicked, a POST request with the images is sent to the serve. 

- ### `GalleryComponent`
    The uploaded images are displayed in this component after sending a GET request to the server which returns an array of all image file names which can be located in the `server/image-upload-backend/uploads` directory


## Services

- ### `UploadService`
    The service includes the following functions
    | Function   |      Args      |  Description |
    |----------|:-------------:|------|
    | uploadImages() |  array | Uploads the images to the server |
    | getImages() |    -   |   Retrieves the array of file names from the server |
    | dataURItoBlob | 64-bit string |    Converts a 64bit image string to a blob |
    | updatePreview | array |    Updates the Subject value to the latest cropped value |


## Server

The server-side application can be found in `server/image-upload-backend/index.js`. Navigate to the directory and run `node index.js` to start the server in port 3000.

#### Requests
| Route   |      Type      |  Description |
|----------|:-------------:|------|
| `/upload` |  POST | Uploads the images in the request body to `server/image-upload-backend/uploads` |
| `/gallery` |    GET  |   Returns the files in the folder `server/image-upload-backend/uploads`  |


## Sample

A sample image for testing with dimensions 1024x1024 can be found in `src/assets/sample` folder.
