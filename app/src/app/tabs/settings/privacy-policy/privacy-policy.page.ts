import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { arrowBackOutline, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrivacyPolicyPage implements OnInit {

  constructor(private router: Router) {
    addIcons({
      arrowBackOutline,
      chevronBackOutline
    })
  }

  ngOnInit() {
  }

  goToDashboard() {
    console.log('test logo click')
    this.router.navigateByUrl('customer/dashboard')
  }

}
