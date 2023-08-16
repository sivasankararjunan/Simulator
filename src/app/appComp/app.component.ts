import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lat: any;
  lng: any;
  constructor(public client: HttpClient) {

  }
  title = 'Ingkalocator';
  options: any = [
    { value: 'select', label: 'Select' },
    { value: 'Dining.png', label: 'Dining' },
    { value: 'Kitchen Room.png', label: 'Kitchen Room' },
    { value: 'Storage Room.png', label: 'Storage Room' }
  ];
  imageSource: string = "";
  displayImage: boolean = false;
  displayImage_QR: boolean = false;

  QRSource: string = "";

  public ngOnInit(): void {
    this.getLocation();
  }
  async dropdown_change(x: any) {

    if (x.target.value === "Select") {
      this.displayImage_QR = this.displayImage = false;
    }
    else {
      this.displayImage = true;
      this.imageSource = `assets/Images/Image.png`;
      let postImageSource = `assets/Images/${x.target.value}`;
      let imageBlob = await this.toDataURL(postImageSource)
      const imageBlob1 = this.dataURItoBlob(imageBlob);
      const imageFile1 = new File([imageBlob1], postImageSource, { type: 'image/png' })
      let formData = new FormData();
      formData.append('objFile', imageFile1);

      this.client.post('https://localhost:7274/Image', formData, { responseType: 'blob' }).subscribe(
        (response) => {
          let imgUrl = URL.createObjectURL(response);
          this.QRSource = imgUrl;
          this.displayImage_QR = true;
        },
        (error) => {
          console.log(error.message);
          this.displayImage_QR = true;
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

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);

        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
