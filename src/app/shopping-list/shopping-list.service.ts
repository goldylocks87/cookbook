import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppinglistService {

    ingredientChanged = new Subject<Ingredient[]>();
    ingredientEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
      // new Ingredient('Apples', 10, 'each'),
      // new Ingredient('Oranges', 8, 'each')
    ];

    setIngredients(ingredients: Ingredient[]) {
      this.ingredients = ingredients;
      this.publishUpdates();
    }

    getIngredient(id: number) {
      return this.ingredients[id];
    }

    getIngredients() {
      return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.publishUpdates();
    }

    addIngredientArray(newIngredients: Ingredient[]) {
      //this.ingredients.push.apply( this.ingredients, newIngredients );
      this.ingredients.push(...newIngredients); // es6 spread to append array to array
      this.publishUpdates();
    }

    updateIngredient(id: number, updatedIngredient: Ingredient) {
      this.ingredients[id] = updatedIngredient;
      this.publishUpdates();
    }

    removeIngredient(id: number) {
      this.ingredients.splice(id,1);
      this.publishUpdates();
    }

    publishUpdates() {
      this.ingredientChanged.next( this.ingredients.slice() );
    }

}
