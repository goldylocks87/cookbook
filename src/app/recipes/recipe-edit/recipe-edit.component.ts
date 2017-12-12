import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private recipeService: RecipeService ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; // we know we are not in create mode if there is an id
        this.initForm(); // spin up the form controls and attempt to prefill the form if in edit mode
      }
    );
  }

  onSubmit() {

    // bc we used made the form value identical to the recipe model
    // we do not need to convert the format, we can just use the form.value
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);

    if( this.editMode ) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel(); // to navigate away
  }

  onCancel() {
    this.router.navigate( ['../'], { relativeTo: this.route } );
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if( this.editMode ) {

      const recipe = this.recipeService.getRecipe( this.id );

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if( recipe['ingredients'] ) {
        for( let ingredient of recipe.ingredients ) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }

    }

    // will either be blank or the info from the recipe item
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }

  onAddIngredient() {
    // make sure to cast this as a form array
    // add validators and init with nothing
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onRemoveIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }

}
