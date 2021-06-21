import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import {RecipesComponent} from './recipes.component';
import { RecipeResolver } from './recipes.resolver';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
   {path:'', component:RecipesComponent, canActivate: [AuthGuard], resolve: {RecipeResolver}, children: [
      {path:'create', component:RecipeCreateComponent, resolve: {RecipeResolver}},
      {path:':index', component:RecipeDetailComponent, resolve: {RecipeResolver}},
      {path:':index/edit', component:RecipeCreateComponent, resolve: {RecipeResolver}}
   ]}
]

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ]
})
export class RecipesRoutingModule {}