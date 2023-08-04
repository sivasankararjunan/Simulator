import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigator-page',
  templateUrl: './navigator-page.component.html',
  styleUrls: ['./navigator-page.component.scss']
})
export class NavigatorPageComponent {
  lat: any;
  lng: any;
  subscription: any;
  constructor(public client: HttpClient,
    private activeRoute: ActivatedRoute) {

  }
  title = 'Navigator';
  imageSource: string = "";

  getChartsData() {
    this.subscription = this.activeRoute.params.subscribe(params => {
      console.log(params);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    // this.loadImage();
    this.getChartsData();
  }
  async loadImage() {

    this.client.get(`https://localhost:7274/Image/`, { responseType: 'blob' }).subscribe(
      (response) => {
        let imgUrl = URL.createObjectURL(response);
        this.imageSource = imgUrl;
      },
      (error) => {
        console.log(error.message);
      });

  }


  getLocation() {
    if (navigator.geolocation) {

      navigator.geolocation.watchPosition((position: any) => {

      });
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