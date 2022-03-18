import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../_services/company.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description','nipt','action'];
  dataSource: any;

  constructor(private companyService: CompanyService, public dialog: MatDialog) { 

  }

  ngOnInit(): void {

    this.companyService.getAllCompany().subscribe((res)=>{
      this.dataSource = res;
      console.log(this.dataSource);
      
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
      width: '250px',
      data: {data: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCompanyComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}