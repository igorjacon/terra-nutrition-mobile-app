import { Component, OnInit } from '@angular/core';
import {personCircleOutline, restaurantOutline, menuOutline, settingsOutline, statsChartOutline, nutritionOutline, reorderThreeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonLabel, IonTabBar, IonTabButton, IonIcon]
})
export class TabsPage implements OnInit {

  constructor(private router: Router) {
    addIcons({
      personCircleOutline,
      statsChartOutline,
      nutritionOutline,
      settingsOutline,
      restaurantOutline
    })

  }

  settingsPage() {
    this.router.navigate(['/customer/settings'])
  }

  ngOnInit() {}

}
