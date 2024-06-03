import { Component, OnInit } from '@angular/core';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonLabel, IonRow } from '@ionic/angular/standalone';
import { checkmarkCircleOutline, personOutline, heart } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html',
  styleUrls: ['./registration-complete.component.scss'],
  standalone: true,
  imports: [IonContent, IonCol, IonHeader, IonIcon, IonButton, IonLabel, IonRow]
})
export class RegistrationCompleteComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({
      checkmarkCircleOutline,
      personOutline,
      heart
    });
  }

  ngOnInit() {}

  navigateToLoginPage() {
    this.router.navigateByUrl('/login')
  }

}
