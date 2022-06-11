import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../_services/company.service';
import { StaticMonthService } from '../_services/monthYearStatic.service';
import { saveAs as importedSaveAs } from "file-saver";

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  companyId: any = "";
  selectedUser: any;
  monthYearList: any;
  selectedMonth: any;
  dataSource: any;
  dataMonth: any;

  constructor(private router: Router,private route: ActivatedRoute, private companyService: CompanyService, private staticMonth: StaticMonthService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.companyId = params.get("id")
    })

    this.fetchMonthData();
    this.fetchMonthYears();


  }


  fetchCompanyData = () => {
    this.dataSource = [];
    this.companyService.singleCompany(this.companyId,this.selectedMonth).subscribe((res)=>{
      this.dataSource = res;
      
    })
  }

  fetchMonthYears(){
    this.staticMonth.getAllMonthsYears().subscribe( (data) => {      
      this.monthYearList = data;
      
    })
  }

  fetchMonthData = () => {
    this.companyService.getAllMonths().subscribe((res)=>{
      this.dataMonth = res;
      this.selectedMonth = this.dataMonth[this.dataMonth.length-1]._id;
      this.fetchCompanyData();

    })
  }

  getValueMonth = (valueId: any) => {
    this.selectedMonth = valueId;
    this.fetchCompanyData();


  }

  getExcelForUsers(){
    this.companyService.getExcelForUsers(this.selectedMonth).subscribe( (res:any) => {
      importedSaveAs(res);

    })
  }

  getExcelForOnlyUser(userId: any, username: any){
    this.selectedUser = userId;

    this.companyService.getExcelForOnlyUser(this.selectedMonth, userId).subscribe( (res:any) => {
      importedSaveAs(res, username+"-"+userId);

      console.log(this.selectedUser);
      

    })
  }


  openSettings() {

    this.router.navigate(['/settings']);
  }

}

