import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../_services/company.service';
import {MatDialog} from '@angular/material/dialog';
import { BONUS_TYPE, CreateCompanyComponent } from '../create-company/create-company.component';

import { Router } from '@angular/router';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  displayedColumns: string[] = ['index','name', 'address','nipt', 'users', 'action'];
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


  convertToShort(desc: string): string{
    let short = "";
    if(desc == BONUS_TYPE.BrutoMujore)
      short =  "BM"
    else if(desc == BONUS_TYPE.NetoMujore)
      short =  "NM"
    else if(desc == BONUS_TYPE.BrutoJavore)
      short =  "BJ"
    else if(desc == BONUS_TYPE.NetoJavore)
      short = "NJ"  
    return short;
  }
  
}