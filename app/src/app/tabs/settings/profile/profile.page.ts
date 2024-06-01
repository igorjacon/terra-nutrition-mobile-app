import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { arrowBackOutline, chevronBackOutline, save } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpService } from 'src/app/services/http.service';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  customer: any = {};
  formattedPhoneNumber: string = '';
  userImgDir = environment.api_base_url + "/uploads/user/";
  profileImgPath: string = "";

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router,
    private httpService: HttpService,
    private platform: Platform
  ) {
    addIcons({
      arrowBackOutline,
      chevronBackOutline
    })
  }

  goToDashboard() {
    this.router.navigateByUrl('customer/dashboard')
  }

  ngOnInit() {
    this.authService.customerData$.subscribe((res: any) => {
      this.customer = res;
      this.profileImgPath = res.user?.profileImg ?? 'assets/imgs/default-profile.png';
      
      if (this.customer.user && this.customer.user.phones) {
        this.formattedPhoneNumber = this.getFormattedPhone(this.customer.user.phones);
      }
    });
  }

  getFormattedPhone(phones: Array<{ prefix: string, number: string }>): string {
    if (phones && phones.length > 0) {
      const phone = phones[0];
      const formattedNumber = phone.number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
      return `${phone.prefix} ${formattedNumber}`;
    }
    return 'N/A';
  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
  
    if (image) {
      this.uploadImage(image.base64String)
      this.profileImgPath = image.webPath ?? this.profileImgPath;
    }
  };

  base64ToBlob(base64String: string) {
    // Decode base64 string
    const byteCharacters = atob(base64String);
    
    // Convert binary data to byte array
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    
    // Create a Uint8Array from the byte array
    const byteArray = new Uint8Array(byteArrays);
    
    // Generate the Blob
    return new Blob([byteArray], { type: 'image/jpeg' });
  }

  async uploadImage(data: any) {
    const fileName = this.customer.user.firstName + '.jpeg';
    const blob = await this.base64ToBlob(data);

    const formData = new FormData();
    formData.append('profileFile', blob, fileName);

    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((token) => {
      this.httpService.post('/api/users/profile-image/'+this.customer.user.id, formData, token).subscribe((response:any) => {
        console.log(response.profileImg);
        this.profileImgPath = response.profileImg;
      }, error => {
        console.error(error);
      });
    });
  }
}
