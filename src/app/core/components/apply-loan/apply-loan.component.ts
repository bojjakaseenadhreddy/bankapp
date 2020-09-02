import { FormGroup } from '@angular/forms';
import { LoanService } from './../../services/loan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent implements OnInit {

  constructor(private loanService: LoanService) { }

  applyLoanFormGroup: FormGroup;
  ngOnInit() {
  }
}
