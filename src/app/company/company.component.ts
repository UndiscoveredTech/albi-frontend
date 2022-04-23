import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../_services/company.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = ['index','name', 'address','nipt', 'users', 'bonus', 'bonusfirstweek', 'bonussecondweek', 'action'];
  dataSource: any;

  constructor(private companyService: CompanyService, public dialog: MatDialog, private router: Router) { 

  }

  ngOnInit(): void {

    this.companyService.getAllCompany().subscribe((res)=>{
      this.dataSource = res;
      console.log(res);
      
    })
  }

  
 
  onDeleteCompany(element: any){
    if(element){
      this.companyService.deleteCompany(element).subscribe( res => {
        this.dataSource = res;
      })
    }
    
  }

  onEditCompany(element: any){
    const dialogRef = this.dialog.open(CreateCompanyComponent, {
      width: '550px',
      data: {data: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result.data);
      this.dataSource = result.data
    });
  
  }

  onViewCompany(element:any){
    this.router.navigate(['/company/view',element._id]);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCompanyComponent, {
      width: '550px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result.data);
      this.dataSource = result.data
    });
  }

  
}