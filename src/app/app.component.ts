import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';


import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public client: HttpClient) {

  }
  title = 'Ingkalocator';
  options = [
    { value: 'select', label: 'Select' },
    { value: 'Image1.png', label: 'Shop 1' },
    { value: 'Image2.png', label: 'Shop 2' },
    { value: 'Image3.png', label: 'Shop 3' }
  ];
  imageSource: string = "";
  displayImage: boolean = false;
  QRSource: string = "";

  async dropdoen_change(x: any) {

    if (x.target.value === "Select") {
      this.displayImage = false;
    }
    else {
      this.displayImage = true;
      this.imageSource = `assets/Images/${x.target.value}`;
      let imageBlob = await this.toDataURL(this.imageSource)
      const imageBlob1 = this.dataURItoBlob(imageBlob);
      const imageFile1 = new File([imageBlob1], this.imageSource, { type: 'image/png' })
      let formData = new FormData();
      formData.append('objFile', imageFile1);

      this.client.post('https://localhost:7274/Image', formData, { responseType: 'blob' }).subscribe(
        (response) => {
          let imgUrl = URL.createObjectURL(response);
          this.QRSource = imgUrl;
        },
        (error) => {
          console.log(error.message);
        });
    }

  }


  toDataURL = async (url: any) => {

    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })

    return result
  };

  dataURItoBlob(dataURI: any) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }
}
