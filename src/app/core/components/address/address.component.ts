import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent{
 
  constructor(private formBuilder:FormBuilder) { }

  

  states = [ ["AP","UP","J&K"],["AZ","NY"]];

  addressForm = this.formBuilder.group({
    street:['',[Validators.required]],
    city:['',[Validators.required]],
    state:['',[Validators.required]],
    pincode:['',[Validators.required]],
    country:['INDIA',[Validators.required]]
  })

  selectedCountry:number = 0;

  onCountrySelectionChange(event){
    event.value == "INDIA" ? this.selectedCountry=0 : this.selectedCountry=1;
  }

  onSubmit(){
    console.log(this.addressForm.value);
  }
}
