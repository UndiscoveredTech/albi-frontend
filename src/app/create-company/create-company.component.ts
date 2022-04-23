import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../_services/company.service';

enum BONUS_TYPE{
  NetoJavore = "NETO Javore",
  NetoMujore = "NETO Mujore",
  BrutoJavore = "BRUTO Javore",
  BrutoMujore = "BRUTO Mujore",
}

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyForm: any; 
  dataSource: any;
  disableButton: boolean = false;
  isUpdate: boolean = false;
  bonus_type_values: any;
  bonus_type_actual_value: any;

  constructor(
    public dialogRef: MatDialogRef<CreateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private companyService: CompanyService,
  ) {
    this.dataSource = data
    if(data.data != undefined){
      this.isUpdate = true;
    }
  }
  ngOnInit(): void {
    this.bonus_type_values = Object.values(BONUS_TYPE);
    this.initForm();
    if(this.isUpdate)  this.loadForm();
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(){
    this.companyForm = new FormGroup({
      emri: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      nipt: new FormControl('',[Validators.required]),
      bonus_type: new FormControl('',Validators.required),
      bonus: new FormControl({value: ''},[Validators.min(0),Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      bonusfirstweek: new FormControl({value: ''},[Validators.min(0),Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      bonussecondweek: new FormControl({value: ''},[Validators.min(0),Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    })
  }

  loadForm(){
    if(this.companyForm){
      this.companyForm.get('emri').setValue(this.dataSource.data.name);
      this.companyForm.get('address').setValue(this.dataSource.data.address);
      this.companyForm.get('nipt').setValue(this.dataSource.data.nipt);
      this.companyForm.get('bonus').setValue(this.dataSource.data.bonus.bonus);
      this.companyForm.get('bonusfirstweek').setValue(this.dataSource.data.bonus.bonusfirstweek);
      this.companyForm.get('bonussecondweek').setValue(this.dataSource.data.bonus.bonussecondweek);
      this.companyForm.get('bonus_type').setValue(this.dataSource.data.bonus.bonus_type);
      

      if(this.companyForm.get('bonus_type').value){
        this.companyForm.controls['bonus'].enable();
        this.companyForm.controls['bonus'].updateValueAndValidity();
      }

    }
  }

  onSubmit(): void {
    let company: any = {
      name:  this.companyForm.get('emri') ? this.companyForm.get('emri').value : null,
      address:  this.companyForm.get('address') ? this.companyForm.get('address').value : null,
      nipt:  this.companyForm.get('nipt') ? this.companyForm.get('nipt').value : null,
      bonus: {
        bonus: this.companyForm.get('bonus') ? parseFloat(this.companyForm.get('bonus').value) : null,
        bonusfirstweek: this.companyForm.get('bonusfirstweek') ? parseFloat(this.companyForm.get('bonusfirstweek').value) : null,
        bonussecondweek: this.companyForm.get('bonussecondweek') ? parseFloat(this.companyForm.get('bonussecondweek').value) : null,
        bonus_type: this.companyForm.get('bonus_type') ? this.companyForm.get('bonus_type').value : null,
      }
    }
    if(this.isUpdate){
      company._id = this.dataSource.data._id
    }


    if(this.isUpdate){
      this.companyService.updateCompany(company).subscribe((res) => {
        this.dialogRef.close({data: res});
      })
    } else{
      this.companyService.createCompany(company).subscribe((res) => {
        this.dialogRef.close({data: res});
      })
    }
  }
    onBonusTypeSelect(event: any){
      this.bonus_type_actual_value = event.value;
      this.companyForm.controls['bonus'].updateValueAndValidity();
  
    }

}