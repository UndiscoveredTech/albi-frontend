import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../_services/company.service';
import { EmployeeService } from '../_services/employee.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  title: string = 'Create New Employee';
  companyList: any;
  employeeForm: any; 
  dataSource: any;
  disableButton: boolean = false;
  isUpdate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService, private companyService: CompanyService,
  ) {
    this.dataSource = data
    
    if(data.data != undefined){
      this.isUpdate = true;
    }
    
  }
  ngOnInit(): void {
    this.initForm();
    this.fetchCompanies();
    console.log(this.data);

    if(this.isUpdate){
      this.title = "Update Employee"
      this.loadForm();  
    }    

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  initForm(){
    this.employeeForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      bankaccount: new FormControl('',[Validators.required]),
      company: new FormControl('',[Validators.required]),

    })
  }

  loadForm(){
    
    if(this.employeeForm){

      this.employeeForm.get('name').setValue(this.dataSource.data.name);
      this.employeeForm.get('bankaccount').setValue(this.dataSource.data.bankaccount);

      this.companyService.singleCompany(this.dataSource.data.company).subscribe( (data) => {              
        this.employeeForm.controls['company'].setValue(data._id);

      })
      
    }
  }

  fetchCompanies(){
    this.companyService.getAllCompany().subscribe( (data) => {      
      this.companyList = data;
    })
  }

  onSubmit(): void {
      let employee: any = {
        name:  this.employeeForm.get('name') ? this.employeeForm.get('name').value : null,
        bankaccount:  this.employeeForm.get('bankaccount') ? this.employeeForm.get('bankaccount').value : null,
        company:  this.employeeForm.get('company') ? this.employeeForm.get('company').value : null,
        companyName:  this.employeeForm.get('company') ? this.employeeForm.get('company').value : null,
        

      }

      if(this.isUpdate){
        employee._id = this.dataSource.data._id
      }

      
      if(this.isUpdate){
        this.employeeService.updateEmployee(employee).subscribe((res) => {
          this.dialogRef.close({data: res});

        })
        
      } else{
        this.employeeService.insertEmployee(employee).subscribe((res) => {
          this.dialogRef.close({data: res});
        })
        
      }

  }
}