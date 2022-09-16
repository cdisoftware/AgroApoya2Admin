import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CosteoComponent } from './components/valoraroferta/costeo/costeo.component';

@NgModule({
  declarations: [
    
  
    CosteoComponent
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule
  ]
})
export class OfertasModule { }
