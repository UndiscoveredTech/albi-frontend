import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EmployeeService } from '../_services/employee.service';
import { CompanyService } from '../_services/company.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['index','username', 'bankaccount', 'company', 'action'];
  dataSource: any;
  companyName: any;
  constructor(private userService: UserService,
     public dialog: MatDialog,private router: Router,private route: ActivatedRoute, private employeeService: EmployeeService, private companyService: CompanyService
    ) { 

  }

  ngOnInit(): void {

    this.employeeService.getAllEmployees().subscribe((res)=>{
      this.dataSource = res;
      
    })
    this.getAllCompany();

  }



  onDeleteEmployee(element: any){
    if(element){
      this.employeeService.deleteEmployee(element).subscribe( res => {
        this.dataSource = res;
      })
    }
    
  }

  onEditEmployee(element: any){
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '550px',
      data: {data: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.dataSource = result.data
    });
  
  }

  onAssoc(element: any){
   

  }

  onCreateEmployee(): void {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '550px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.dataSource = result.data
      
    });
  }

  getAllCompany = () => {
    this.companyService.getAllCompany().subscribe( (data) => {     
      this.companyName = data;
      
      console.log("company_name", this.companyName);
      
      
    })
  }

  
}