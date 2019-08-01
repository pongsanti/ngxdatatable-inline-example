import { Component, OnInit } from '@angular/core';
import { companies } from './company.js';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.sass']
})
export class InlineComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.rows = companies;
  }

  editing = {};
  rows = [];

  partnersForm: FormGroup = new FormGroup({});
  partnersFormArray: FormArray = new FormArray([]);

  ngOnInit(): void {
    // build forms
    for (const row of this.rows) {
      const rowGroup = this.fb.group({
        name: new FormControl(row.name, Validators.required),
        gender: new FormControl(row.gender, Validators.required),
      });
      this.partnersFormArray.push(rowGroup);
    }

    console.log(this.partnersFormArray);

    this.partnersForm.addControl('partners', this.partnersFormArray);

    this.partnersForm.valueChanges.subscribe(this.onValueChange.bind(this));
  }

  onValueChange(data) {
    // console.log(data);
  }

  c(rowIndex: number, fieldName: string): AbstractControl {
    return this.partnersFormArray.controls[rowIndex].get(fieldName);
  }

  onInputBlur(rowIndex: number, fieldName: string) {
    console.log(rowIndex, fieldName);

    // the lastest edit row data
    const editFormGroup = this.partnersFormArray.controls[rowIndex];
    console.log(editFormGroup.value);

    // turn off edit mode if the control valid
    this.editing[rowIndex + '-' + fieldName] = !this.c(rowIndex, fieldName).valid;
  }

  onSubmit() {
    console.log(this.partnersForm.value);
  }

  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

}
