import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {HttpService} from "../../services/http.service";
import {StorageService} from "../../services/storage.service";
import {AuthConstants} from "../../config/auth-constants";
import {finalize} from "rxjs";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecipesPage implements OnInit {
  recipes : any[] = [];
  loaded : boolean = false;
  sanitizedHTML: SafeHtml = "";
  instructions: Record<string, boolean> = {}; // Object to track the visibility state of notes for each meal option
  constructor(private httpService: HttpService, private storageService: StorageService, private sanitizer: DomSanitizer)
  {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.storageService.get(AuthConstants.ACCESS_TOKEN).then((token) => {
      this.httpService.get('/api/recipes', token).pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe((recipes : any) => {
          console.log(recipes);
          if (recipes.length) {
            this.recipes = recipes;
          }
      });
    });
  }

  toggleInstructions(recipeId: string) {
    this.instructions[recipeId] =!this.instructions[recipeId];
  }

  sanitizeHTML(htmlContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}
