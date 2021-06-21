import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DropdownMenuDirective } from "./dropdown-menu.directive";

@NgModule({
   declarations: [
      DropdownMenuDirective,
   ],
   imports: [
      ReactiveFormsModule,
      HttpClientModule,
      CommonModule,
      FormsModule
   ],
   exports: [
      DropdownMenuDirective,
      ReactiveFormsModule,
      HttpClientModule,
      CommonModule,
      FormsModule
   ]
})
export class SharedModule{}