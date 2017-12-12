import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Steak Frites',
            'A sliced steak sandwich with fries.',
            'https://media-cdn.tripadvisor.com/media/photo-s/09/25/2d/36/steak-sandwich-decent.jpg',
            [
                new Ingredient('Ribeye',1),
                new Ingredient('Hoagie',4),
                new Ingredient('Frozen French Fries',1)
            ]
        ),
        new Recipe(
            'Tacos',
            'Flour tortilla with seasoned ground kitties.',
            'https://www.tacobueno.com/assets/food/tacos/Taco_Crispy_Beef_990x725.jpg',
            [
                new Ingredient('Flour Tortilla',8),
                new Ingredient('Ground Beef (lb)',1),
                new Ingredient('Taco Seasoning (tbs)',2),
                new Ingredient('Water (Cup)',.25),
                new Ingredient('Shredded Lettuce (Cup)',2),
                new Ingredient('Shredded Cheese (Cup)',2),
                new Ingredient('Diced Tomatoes (Cup)',2),
                new Ingredient('Kitties (Dash)',1)
            ]
        ),
    ];

    getRecipes() {
        return this.recipes.slice(); // returns a copy of the array
    }

    getRecipe( id: number ) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next( this.recipes.slice() );
    }

    updateRecipe(id: number, newRecipe: Recipe) {
      this.recipes[id] = newRecipe;
      this.recipesChanged.next( this.recipes.slice() );
    }

}
