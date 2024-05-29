import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule, IonicStorageModule],
})
export class AppComponent {
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.requestPermissions();
    this.notificationService.scheduleNotification();
  }

}
