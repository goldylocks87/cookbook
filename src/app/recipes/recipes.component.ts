import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // this.recipeService.recipeSelected.subscribe(
    //   // listen for the event (emits a recipe object) & execute this function to set the property
    //   (recipe: Recipe) => this.selectedRecipe = recipe;
    // );
  }

}
