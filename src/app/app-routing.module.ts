import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './appComp/app.component';
import { NavigatorPageComponent } from './navigator-page/navigator-page.component';
const routes: Routes =
  [
   {path:'',component:AppComponent },
    { path: 'home', component: AppComponent },
    { path: 'navigator', component: NavigatorPageComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [NavigatorPageComponent]
})
export class AppRoutingModule {


}
