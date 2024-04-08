import { Component, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { optionsOutline, restaurantOutline, speedometerOutline, barbellOutline, homeOutline, settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsComponent  implements OnInit {

  constructor() {
    addIcons({
      optionsOutline,
      restaurantOutline,
      speedometerOutline,
      barbellOutline,
      homeOutline,
      settingsOutline
    });
  }

  ngOnInit() {}

}
