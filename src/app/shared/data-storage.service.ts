import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  token: string;

  constructor(private http: Http,
              private recipeService: RecipeService,
              private ingredientService: ShoppinglistService,
              private authService: AuthService ) {

    this.fetchRecipes();
    this.fetchIngredients();
  }

  storeRecipes() {
    this.authService.getToken()
      .then(
        response => {
          this.token = <string>response;
          this.http.put( 'https://cookbook-v1.firebaseio.com/recipes.json?auth=' + this.token,
                          this.recipeService.getRecipes() )
            .subscribe(
              httpResponse => console.log(httpResponse)
            );
        })
      .catch( error => console.log(error) );
  }

  fetchRecipes() {
    this.http.get( 'https://cookbook-v1.firebaseio.com/recipes.json' )
      .map(
        (response: Response) => {
          // make sure that if there are no ingredients that we init an empty array
          const recipes: Recipe[] = response.json();
          for( let recipe of recipes ) {
            if( !recipe['ingredients'] ) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes( recipes ); // use response from WS
        }
      );
  }

  storeIngredients() {
    this.authService.getToken()
      .then(
        response => {
          this.token = <string>response;
          this.http.put( 'https://cookbook-v1.firebaseio.com/ingredients.json?auth=' + this.token,
                          this.ingredientService.getIngredients() )
            .subscribe(
              httpResponse => console.log(httpResponse)
            );
        })
      .catch( error => console.log(error) );
  }

  fetchIngredients() {
    this.http.get( 'https://cookbook-v1.firebaseio.com/ingredients.json' )
      .map(
        (response: Response) => {
          const ingredients: Ingredient[] = response.json();
          for( let ingredient of ingredients ) {
            if( !ingredient['uom'] ) {
              ingredient['uom'] = 'each';
            }
          }
          return ingredients;
        }
      )
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredientService.setIngredients( ingredients ); // use response from WS
        }
      );
  }

}
