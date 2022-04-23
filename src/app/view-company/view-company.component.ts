import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../_services/company.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  companyId: any = "";
  dataSource: any;
  constructor(private router: Router,private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.companyId = params.get("id")
    })

    this.fetchCompanyData();
  }


  fetchCompanyData = () => {
    this.companyService.singleCompany(this.companyId).subscribe((res)=>{
      this.dataSource = res;
      console.log(this.dataSource);
      
    })
  }

}