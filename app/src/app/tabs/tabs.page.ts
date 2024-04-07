import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {personCircleOutline, menuOutline, statsChartOutline, nutritionOutline, reorderThreeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonContent, IonLabel, IonMenu, IonMenuToggle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonMenu, IonMenuToggle, IonLabel, IonTabBar, IonTabButton, IonButton, IonIcon, IonContent]
})
export class TabsPage implements OnInit {

  constructor() { 
    addIcons({
      personCircleOutline,
      statsChartOutline,
      nutritionOutline,
      reorderThreeOutline,
      menuOutline
    })
  }

  ngOnInit() {
  }

}
