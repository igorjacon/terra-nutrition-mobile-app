import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  async requestPermissions(): Promise<void> {
    const permissions = await LocalNotifications.requestPermissions();
    console.log('Permissions granted:', permissions.display);
  }


  async scheduleNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Test Notification",
          body: "This is a test notification",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 60 * 1) }, // 1 minutes from now
          // sound: null,
          // attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  }
  
  // LocalNotifications.addListener('localNotificationReceived', (notification) => {
  //   console.log('Notification received:', notification);
  // });
  
  // LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
  //   console.log('Notification action performed', notification);
  // });
  

}
