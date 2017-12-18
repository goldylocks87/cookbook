import { Component } from '@angular/core';
import { Response } from '@angular/http/';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorage: DataStorageService,
              public authService: AuthService) {  }

  onSaveData() {
    this.dataStorage.storeRecipes();
    this.dataStorage.storeIngredients();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes();
    this.dataStorage.fetchIngredients();
  }

  onLogout() {
    this.authService.logout();
  }

}
