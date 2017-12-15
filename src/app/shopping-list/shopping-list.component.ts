import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  filteredString = '';
  private subscription: Subscription;

  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    // subscribe to the emitted event in the service so that any time a new ingredient is added
    // we get a new copy of the ingedients array.
    this.subscription = this.shoppinglistService.ingredientChanged.subscribe(
        (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(id: number) {
    this.shoppinglistService.ingredientEditing.next(id);
  }

}
