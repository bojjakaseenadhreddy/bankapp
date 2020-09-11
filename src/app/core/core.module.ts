import { UpdateComplaintComponent } from './components/update-complaint/update-complaint.component';


import { AngMaterialModule } from './../ang-material/ang-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    UpdateComplaintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngMaterialModule
  ],
  exports: [

  ]
})
export class CoreModule {

}