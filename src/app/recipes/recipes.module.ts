import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipeCreateComponent } from "./recipe-create/recipe-create.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "../shared.module";

@NgModule({
   declarations: [
      RecipeCreateComponent,
      RecipeDetailComponent,
      RecipeItemComponent,
      RecipeListComponent,
      RecipesComponent
   ],
   imports: [
      RecipesRoutingModule,
      SharedModule
   ]
})
export class RecipesModule{}