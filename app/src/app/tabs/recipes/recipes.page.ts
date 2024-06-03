import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {HttpService} from "../../services/http.service";
import {StorageService} from "../../services/storage.service";
import {AuthConstants} from "../../config/auth-constants";
import {finalize} from "rxjs";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { addCircle, menu, sadOutline, alertCircleOutline, chevronForwardCircleOutline, chevronDownCircleOutline, calendarOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonHeader, IonToolbar, IonContent, IonRefresher, IonRefresherContent, IonSpinner, 
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonHeader, IonToolbar, IonContent, IonRefresher, IonRefresherContent, IonSpinner, 
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon ]
})
export class RecipesPage implements OnInit {
  recipes: any[] = [];
  loaded: boolean = false;
  sanitizedHTML: SafeHtml = "";
  instructions: Record<string, boolean> = {}; // Object to track the visibility state of notes for each meal option
  constructor(private httpService: HttpService, private storageService: StorageService, private sanitizer: DomSanitizer, private router: Router)
  {
    addIcons({
      sadOutline,
      alertCircleOutline
    })
  }

  ngOnInit() {
    this.loadData()
  }

  goToDashboard() {
    console.log('test logo click')
    this.router.navigateByUrl('customer/dashboard')
  }

  loadData() {
    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((token) => {
      this.httpService.get('/api/recipes', token).pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe((recipes: any) => {
        if (recipes.length) {
          this.recipes = recipes;
        }
      });
    });
  }

  toggleInstructions(recipeId: string) {
    this.instructions[recipeId] = !this.instructions[recipeId];
  }

  sanitizeHTML(htmlContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  navigateToProfessionalPage() {
    this.router.navigateByUrl('customer/settings/professional')
  }

  doRefresh(event: any) {
    this.loaded = false;
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
