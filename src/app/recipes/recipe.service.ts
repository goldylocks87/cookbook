import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // new Recipe(
        //     'Steak Frites',
        //     'Steak-frites, meaning "steak and fries" in French, is a very common and popular dish served in brasseries throughout Europe consisting of steak paired with French fries. It is considered by some to be the national dish of Belgium and France, which both claim to be the places of its invention.',
        //     'http://clv.h-cdn.co/assets/cm/15/09/54f0bc98ed4cd_-_steak-frites-recipe-rbk1111-xl.jpg',
        //     [
        //         new Ingredient('Ribeye', 1, 'each'),
        //         new Ingredient('Hoagie', 4, 'each'),
        //         new Ingredient('Frozen French Fries', 1, 'each')
        //     ]
        // ),
        // new Recipe(
        //     'Tacos',
        //     'A taco is a traditional Mexican dish composed of a corn or wheat tortilla folded or rolled around a filling. A taco can be made with a variety of fillings, including beef, pork, chicken, seafood, vegetables, and cheese, allowing for great versatility and variety. A taco is generally eaten without utensils and is often accompanied by garnishes such as salsa, chili pepper, avocado, guacamole, cilantro (coriander), tomatoes, onions, lettuce and kitties.',
        //     'https://www.tacobueno.com/assets/food/tacos/Taco_Crispy_Beef_990x725.jpg',
        //     [
        //         new Ingredient('Flour Tortilla', 8, 'each'),
        //         new Ingredient('Ground Beef', 1, 'lb'),
        //         new Ingredient('Taco Seasoning', 2, 'tbs'),
        //         new Ingredient('Water', 1, 'cup'),
        //         new Ingredient('Shredded Lettuce', 2, 'cup'),
        //         new Ingredient('Shredded Cheese', 2, 'cup'),
        //         new Ingredient('Diced Tomatoes', 2, 'cup'),
        //         new Ingredient('Kitties', 1, 'dash')
        //     ]
        // ),
    ];

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next( this.recipes.slice() );
    }

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

    removeRecipe(id: number) {
      this.recipes.splice(id, 1);
      this.recipesChanged.next( this.recipes.slice() );
    }
}
