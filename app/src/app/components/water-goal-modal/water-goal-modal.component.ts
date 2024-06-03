import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { arrowBackOutline, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LocalNotifications, PermissionStatus } from '@capacitor/local-notifications';
import { IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-water-goal-modal',
  templateUrl: './water-goal-modal.component.html',
  styleUrls: ['./water-goal-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonToggle]
})
export class WaterGoalModalComponent {
  @Input() currentGoal!: number;
  @Output() settingsChanged = new EventEmitter<any>();
  goal: number = 0; // Initialized with a default value

  reminders = {
    enabled: false
  };
  unitPreference: string = 'glasses'; // Default unit
  unitLabel: string = 'glasses'; // Unit label for display
  hydrationTips = {
    enabled: false,
    frequency: 3 // Default to 3 times/day
  };
  weeklyReport = {
    enabled: false,
    day: 'monday', // Default to Monday
    time: '09:00' // Default to 9 AM
  };

  constructor(
    private modalController: ModalController,
    private storageService: StorageService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      arrowBackOutline,
      chevronBackOutline
    });
  }

  async ngOnInit() {
    this.goal = this.currentGoal;
    this.loadSettings();
    if (this.reminders.enabled) {
      await this.requestPermission();
      this.setupReminders();
    }
    this.updateUnitLabel();
  }

  async requestPermission() {
    const { display } = await LocalNotifications.checkPermissions();
    if (display !== 'granted') {
      const result = await LocalNotifications.requestPermissions();
      if (result.display !== 'granted') {
        const alert = await this.alertController.create({
          header: 'Permission Denied',
          message: 'Notification permissions are required for reminders.',
          buttons: ['OK']
        });
        await alert.present();
        this.reminders.enabled = false;
        return;
      }
    }
  }

  loadSettings() {
    this.storageService.get('reminders').then(reminders => {
      if (reminders) {
        this.reminders = reminders;
      }
    });
    this.storageService.get('unitPreference').then(unit => {
      if (unit) {
        this.unitPreference = unit;
        this.updateUnitLabel();
      }
    });
    this.storageService.get('hydrationTips').then(tips => {
      if (tips) {
        this.hydrationTips = tips;
      }
    });
    this.storageService.get('weeklyReport').then(report => {
      if (report) {
        this.weeklyReport = report;
      } else {
        this.weeklyReport = {
          enabled: false,
          day: 'monday',
          time: '09:00'
        };
      }
    });
  }

  saveSettings() {
    this.storageService.set('waterGoal', this.goal);
    this.storageService.set('reminders', this.reminders);
    this.storageService.set('unitPreference', this.unitPreference);
    this.storageService.set('hydrationTips', this.hydrationTips);
    this.storageService.set('weeklyReport', this.weeklyReport).then(() => {
      this.settingsChanged.emit();
      this.modalController.dismiss(this.goal);
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async setupReminders() {
    if (!this.reminders.enabled) return;

    const reminderTimes = [
      { time: '08:00', percentage: 33 },
      { time: '13:00', percentage: 66 },
      { time: '20:00', percentage: 100 }
    ];

    for (const reminder of reminderTimes) {
      const now = new Date();
      const reminderTime = new Date();
      const [hours, minutes] = reminder.time.split(':');
      reminderTime.setHours(+hours, +minutes, 0, 0);

      if (now < reminderTime) {
        const timeout = reminderTime.getTime() - now.getTime();
        setTimeout(async () => {
          const intake = await this.storageService.get('waterIntake');
          if ((intake / this.goal) * 100 < reminder.percentage) {
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: 'Hydration Reminder',
                  body: `You have not reached ${reminder.percentage}% of your water goal for today.`,
                  id: new Date().getTime(),
                  schedule: { at: new Date(new Date().getTime() + timeout) },
                  sound: undefined,
                  attachments: undefined,
                  actionTypeId: '',
                  extra: null
                }
              ]
            });
          }
        }, timeout);
      }
    }
  }

  updateUnitLabel() {
    if (this.unitPreference === 'ml') {
      this.unitLabel = 'milliliters (ml)';
    } else if (this.unitPreference === 'L') {
      this.unitLabel = 'liters (L)';
    } else {
      this.unitLabel = 'glasses';
    }
  }
}

