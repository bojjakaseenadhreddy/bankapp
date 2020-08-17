import { AddressModel } from './../../../../interfaces/AddressModel';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddressService } from '../../../core/services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  @Output() onAddressId = new EventEmitter<number>();
  updateAddressForm: FormGroup;
  address: AddressModel;
  isSaving: boolean = false;
  addressId: number;

  constructor(private formBuilder: FormBuilder, private addressService: AddressService, private snackBar: MatSnackBar, private router: ActivatedRoute) { }
  ngOnInit() {


    //this.addressId= +this.router.snapshot.paramMap.get('id');
    this.addressId = 6;

    this.addressService.getAddressById(this.addressId).subscribe(
      (data) => {
        this.address = data;
        if (this.address.country == "US") {
          this.selectedCountry = 1;
        }
        this.patchValue();

      },
      (error) => { console.log(error) }
    );


    this.updateAddressForm = this.formBuilder.group({
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

    console.log(this.updateAddressForm.value);
    if (this.updateAddressForm.valid) {
      this.isSaving = true;
      this.address = this.updateAddressForm.value;
      this.address.id = this.addressId;
      this.addressService.updateAddress(this.addressId, this.address).subscribe(
        (data) => {
          this.isSaving = false;
          this.snackBar.open("Update Success", "OK", { duration: 3000 })
        },
        (error) => { console.log(error) }
      );
    }
    else
      this.snackBar.open("Please Fill All Mandatory Fields", "OK", { duration: 2000 })
  }

  patchValue() {
    this.updateAddressForm.patchValue({

      pinCode: this.address.pinCode,
      country: this.address.country,
      street: this.address.street,
      city: this.address.city,
      state: this.address.state
    })
  }
}