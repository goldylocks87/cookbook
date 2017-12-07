import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // view child to get access to the local ref of the form from the html
  @ViewChild('f') shoppingForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editedItem: Ingredient;

  constructor( private shoppinglistService: ShoppinglistService ) { }

  ngOnInit() {
    // subscribing to ingedient clicks through subject listening on the service
    this.subscription = this.shoppinglistService.ingredientEditing.subscribe(
      (id: number) => {

        this.editMode = true;
        this.editedItemId = id;
        this.editedItem = this.shoppinglistService.getIngredient(id);

        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newIngredient = new Ingredient( value.name, value.amount );

    if( this.editMode ) {
      this.shoppinglistService.updateIngredient( this.editedItemId, newIngredient );
    } else {
      this.shoppinglistService.addIngredient( newIngredient );
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if( this.editMode ) {
      this.shoppinglistService.removeIngredient( this.editedItemId );
      this.onClear();
    }
  }

}
