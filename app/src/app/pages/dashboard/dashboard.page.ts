import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {

  user: any;

  constructor(private authService: AuthService, private storageService: StorageService) { }

  async ngOnInit() {
    const accessToken = await this.storageService.get(AuthConstants.ACCESS_TOKEN);
    const refreshToken = await this.storageService.get(AuthConstants.REFRESH_TOKEN);

    this.authService.userData$.subscribe((res:any) => {
      this.user = res;
    });
  }

}
