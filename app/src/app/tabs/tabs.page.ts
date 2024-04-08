import { Component, OnInit } from '@angular/core';
import {personCircleOutline, menuOutline, settingsOutline, statsChartOutline, nutritionOutline, reorderThreeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonTabs, IonTabBar,IonTabButton, IonIcon, IonContent, IonLabel, IonMenu, IonMenuToggle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonLabel, IonTabBar, IonTabButton, IonButton, IonIcon, IonContent]
})
export class TabsPage implements OnInit {

  constructor() {
    addIcons({
      personCircleOutline,
      statsChartOutline,
      nutritionOutline,
      reorderThreeOutline,
      menuOutline,
      settingsOutline
    })
  }

  ngOnInit() {}

}
