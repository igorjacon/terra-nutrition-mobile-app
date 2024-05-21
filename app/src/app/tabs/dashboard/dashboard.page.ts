import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {AuthConstants} from "../../config/auth-constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  userHasCompletedIntakeForm = true;
  userHasMealPlans = false;
  customer: any;

  constructor(private authService: AuthService, private storageService: StorageService) { }

   ngOnInit() {

    this.authService.customerData$.subscribe((res:any) => {
      this.customer = res;
      console.log(res)
    });
  }

}
