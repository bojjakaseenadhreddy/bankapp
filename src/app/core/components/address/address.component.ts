import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressService } from './../../../core/services/address.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddressModel } from '../../../../interfaces/AddressModel';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


  @Output() onAddressId = new EventEmitter<number>();
  addressForm: any;
  address: AddressModel;
  isSaving:boolean = false;

  constructor(private formBuilder: FormBuilder, private addressService: AddressService, private snackBar:MatSnackBar) { }
  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      country: ['INDIA', [Validators.required]]
    })
  }

  states = [
    ["AP", "UP", "J&K"],
    ["AZ", "NY"]
  ];



  selectedCountry: number = 0;

  onCountrySelectionChange(event) {
    event.value == "INDIA" ? this.selectedCountry = 0 : this.selectedCountry = 1;
  }

  onSubmit() {
    
    console.log(this.addressForm.value);
    if(this.addressForm.valid){
      this.isSaving = true;
       this.address = this.addressForm.value;
    this.addressService.createAddress(this.address).subscribe(
      (data) => { 
        this.address=data;
         this.onAddressId.emit(this.address.id);
         console.log(this.address);
         this.isSaving = false;
       },
      (error) => { console.log(error) }
    );
    }
   else
    this.snackBar.open("Please Fill All Mandatory Fields","OK",{duration:2000})

  }
}
