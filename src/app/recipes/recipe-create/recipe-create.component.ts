import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesAction from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipesForm: FormGroup
  index: number;
  editMode: boolean;
  btnText: string;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params.index;
      this.editMode = params.index !== undefined;
      this.btnText = this.editMode ? 'Edit' : 'Add';
    });

    const recipe = {
      name: null,
      description: null,
      imagePath: null,
      ingredients: []
    }

    if(this.editMode){
      this.store.select('recipes').pipe(take(1)).subscribe((recipesState) => {
        recipe.name = recipesState.recipes[this.index].name;
        recipe.description = recipesState.recipes[this.index].description;
        recipe.imagePath = recipesState.recipes[this.index].imagePath;
        recipesState.recipes[this.index].ingredients.forEach((ingredient: Ingredient) => {
          const ingredientFormGroup = new FormGroup({
            name: new FormControl(ingredient.name, [Validators.required]),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
          });
          recipe.ingredients.push(ingredientFormGroup);
        });
      })
    }

    this.recipesForm = new FormGroup({
      name: new FormControl(recipe.name, [Validators.required]),
      description: new FormControl(recipe.description, [Validators.required]),
      imagePath: new FormControl(recipe.imagePath, [Validators.required]),
      ingredients: new FormArray(recipe.ingredients)
    });
  }

  addIngredient(): void {
    const ingredient = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
    (this.recipesForm.get('ingredients') as FormArray).push(ingredient);
  }

  deleteIngredient(index: number): void {
    (<FormArray>this.recipesForm.get('ingredients')).removeAt(index);
  }

  get ingredients(): AbstractControl[]{
    return (<FormArray>this.recipesForm.get('ingredients')).controls;
  }

  onSubmit(): void {
    if(this.editMode){
      return this.store.dispatch(RecipesAction.editRecipe({recipe: this.recipesForm.value, index: this.index}));
    }
    this.store.dispatch(RecipesAction.addRecipe({recipe: this.recipesForm.value}));
  }

}
