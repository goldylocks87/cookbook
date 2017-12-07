import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppinglistService {

    ingredientChanged = new Subject<Ingredient[]>();
    ingredientEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
      new Ingredient('Apples', 10),
      new Ingredient('Oranges', 8)
    ];

    getIngredient(id: number) {
      return this.ingredients[id];
    }

    getIngredients() {
      return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientChanged.next( this.ingredients.slice() );
    }

    addIngredientArray(newIngredients: Ingredient[]) {
      //this.ingredients.push.apply( this.ingredients, newIngredients );
      this.ingredients.push(...newIngredients); // es6 spread to append array to array
      this.ingredientChanged.next( this.ingredients.slice() );
    }

    updateIngredient(id: number, updatedIngredient: Ingredient) {
      this.ingredients[id] = updatedIngredient;
      this.ingredientChanged.next( this.ingredients.slice() );
    }

    removeIngredient(id: number) {
      this.ingredients.splice(id,1);
      this.ingredientChanged.next( this.ingredients.slice() );
    }

}
