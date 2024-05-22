import { Component, OnInit } from '@angular/core';
import {personCircleOutline, restaurantOutline, menuOutline, settingsOutline, statsChartOutline, nutritionOutline, reorderThreeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonLabel, IonTabBar, IonTabButton, IonIcon]
})
export class TabsPage implements OnInit {

  constructor() {
    addIcons({
      personCircleOutline,
      statsChartOutline,
      nutritionOutline,
      settingsOutline,
      restaurantOutline
      
    })
  }

  ngOnInit() {}

}
