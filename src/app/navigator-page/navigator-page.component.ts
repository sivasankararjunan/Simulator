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
    this.subscription = this.activeRoute.queryParamMap.subscribe(url => {
      let uid = url.get('uid')
      if (uid) {
        this.loadImage(uid);
      }
    });
  }
  slat:any;
  top:any;
  left:any;
  sLong:any;
  s: any;

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.s);
  }

  public ngOnInit(): void {
    this.getChartsData();
    this.getLocation();
    this.slat=this.lat;
    this.sLong=this.lng;
    this.top=100;
    this.left=60;
    this.s=setInterval(this.PointMotion,2000);
  }
  async loadImage(uid: string) {

    this.client.get(`https://localhost:7274/Image/${uid}`, { responseType: 'blob' }).subscribe(
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
  

  PointMotion=():void=>{
    this.getLocation();
    if(this.lat==this.slat || this.lng==this.sLong){
      return
    }
    this.top=this.top+Math.round((this.slat-this.lat)*111111);
    this.left=this.left+Math.round((this.sLong-this.lng)*111111);
    if(this.top > 300){this.top=300;}
    if(this.top < 0){this.top=0;}
    if(this.left < 0){this.left=0;}
    if(this.left > 500){this.left=500;}
  }
}