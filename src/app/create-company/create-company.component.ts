import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../_services/company.service';


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  companyForm: any; 
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<CreateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private getCompany: CompanyService,
  ) {
    this.dataSource = data
  }
  ngOnInit(): void {
    this.initForm();
    console.log("---here ",this.dataSource );
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(){
    this.companyForm = new FormGroup({
      emri: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      nipt: new FormControl('',[Validators.required]),

    })
  }

  onSubmit(): void {
      let companyToInsert: any = {
        name:  this.companyForm.get('emri').value,
        description:  this.companyForm.get('description').value,
        nipt:  this.companyForm.get('nipt').value
      }
      this.getCompany.createCompany(companyToInsert).subscribe((res) => {
        
      })
      this.dialogRef.close();

  }

}