import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DocumentData } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
changeImage() {
throw new Error('Method not implemented.');
}
  profile:DocumentData | undefined;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) {
    // this.avatarService.getUserProfile().subscribe((data) => {
    //   // this.profile = data;
    //   console.log("data: ", data);
      
    // })
    console.log(this.avatarService.getUserProfile());
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

}
