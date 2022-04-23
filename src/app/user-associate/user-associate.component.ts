import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompanyService } from '../_services/company.service';
import { EmployeeService } from '../_services/employee.service';
import { StaticMonthService } from '../_services/monthYearStatic.service';
import { UserService } from '../_services/user.service';


interface Calculation {
  monthlyGrossSalary: Number,
  hourlyWage: Number,
  normalWorkingHours: Number,
  nightWorkingHoursDuringWeek: Number,
  overtimeDuringWeek: Number,
  workingHoursOnWeekend: Number,
  nightWorkingHoursDuringWeekend: Number,
  overtimeDuringWeekend: Number,
  totalPaidDays: Number,
  grossSalaryAll: Number,
  levelOfInsurance: Number,
  user_id: String
}

interface MonthYear {
  _id: String
  month: String,
  year: Number
}
@Component({
  selector: 'app-user-associate',
  templateUrl: './user-associate.component.html',
  styleUrls: ['./user-associate.component.css']
})
export class UserAssociateComponent implements OnInit {

  userId: any = "";
  userData: any;
  monthYearList: any;
  form: any;
  companyList: any;

  staticMonthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  constructor(private route: ActivatedRoute,
    private companyService: CompanyService,private emploeyeeService: EmployeeService,private staticMonth: StaticMonthService) { }

  ngOnInit(): void {
    this.initForm();


    this.route.paramMap.subscribe(params => {
      this.userId = params.get("id")
    })
    this.fetchCompanies();
    this.loadForm();
    this.fetchMonthYears();

  }

  initForm(){
    this.form = new FormGroup({
      name: new FormControl({value: '', disabled: true}, [Validators.required]),
      email: new FormControl({value: '', disabled: true}, [Validators.required]),
      company: new FormControl({value: '', disabled: true}, [Validators.required]),
      monthYear: new FormControl('',[Validators.required]),
      monthlyGrossSalary: new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      hourlyWage: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      normalWorkingHours: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nightWorkingHoursDuringWeek: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      overtimeDuringWeek: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      workingHoursOnWeekend: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nightWorkingHoursDuringWeekend: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),

      overtimeDuringWeekend: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      totalPaidDays: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      grossSalaryAll: new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      levelOfInsurance: new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    })
  }

  loadForm(){
    let monthYear: MonthYear;
    const d = new Date();
    let month = this.staticMonthList[d.getMonth()];
    let year = d.getFullYear();
    let monthYearId = "";

    if(this.form){

      this.emploeyeeService.getSingleEmployee(this.userId).subscribe( (data) => {              
        this.userData = data;
        data.name ? this.form.get('name').setValue(data.name) : null;
        data.email ? this.form.get('email').setValue(data.email) : null;
        this.companyService.singleCompany(data.company).subscribe( (dataCompany) => {                        
          dataCompany.name ? this.form.controls['company'].setValue(dataCompany.name) : null;
        })

        this.staticMonth.getIdByMonthAndYear(month,year).subscribe(data => {
          data._id ? this.form.controls['monthYear'].setValue(data._id) : null;
            monthYearId = data._id;
            this.emploeyeeService.getCalculationForUserAndYearMonth(monthYearId,this.userId).subscribe( (data) => {      
              if(data){
                data.monthlyGrossSalary ? this.form.controls['monthlyGrossSalary'].setValue(data.monthlyGrossSalary) : null;
                data.hourlyWage ? this.form.controls['hourlyWage'].setValue(data.hourlyWage) : null;
                data.normalWorkingHours ? this.form.controls['normalWorkingHours'].setValue(data.normalWorkingHours) : null;
                data.nightWorkingHoursDuringWeek ? this.form.controls['nightWorkingHoursDuringWeek'].setValue(data.nightWorkingHoursDuringWeek) : null;

                data.overtimeDuringWeek ? this.form.controls['overtimeDuringWeek'].setValue(data.overtimeDuringWeek) : null;
                data.workingHoursOnWeekend ? this.form.controls['workingHoursOnWeekend'].setValue(data.workingHoursOnWeekend) : null;
                data.nightWorkingHoursDuringWeekend ? this.form.controls['nightWorkingHoursDuringWeekend'].setValue(data.nightWorkingHoursDuringWeekend) : null;

                data.overtimeDuringWeekend ? this.form.controls['overtimeDuringWeekend'].setValue(data.overtimeDuringWeekend) : null;
                data.totalPaidDays ? this.form.controls['totalPaidDays'].setValue(data.totalPaidDays) : null;
                data.grossSalaryAll ? this.form.controls['grossSalaryAll'].setValue(data.grossSalaryAll) : null;
                data.levelOfInsurance ? this.form.controls['levelOfInsurance'].setValue(data.levelOfInsurance) : null;

              }
            })
        });


      })
    }
  }


  // async getMonthYearIdByActualDate(): Observable<any> {
  //   let monthYear: MonthYear;
  //   const d = new Date();
  //   let month = this.staticMonthList[d.getMonth()];
  //   let year = d.getFullYear();
  //   return this.staticMonth.getIdByMonthAndYear(month,year);
  // }
  fetchMonthYears(){
    this.staticMonth.getAllMonthsYears().subscribe( (data) => {      
      this.monthYearList = data;
    })
  }



  fetchCompanies(){
    this.companyService.getAllCompany().subscribe( (data) => {      
      this.companyList = data;
    })
  }
  onUpdate(userId:any){

    const calculation1: Calculation = {
        monthlyGrossSalary: this.form.get("monthlyGrossSalary") ? parseFloat(this.form.get("monthlyGrossSalary").value) : NaN,
        hourlyWage: this.form.get("hourlyWage") ? parseFloat(this.form.get("hourlyWage").value) : NaN,
        normalWorkingHours: parseFloat(this.form.get("normalWorkingHours").value),
        nightWorkingHoursDuringWeek: parseFloat(this.form.get("nightWorkingHoursDuringWeek").value),

        overtimeDuringWeek: parseFloat(this.form.get("overtimeDuringWeek").value),
        workingHoursOnWeekend: parseFloat(this.form.get("workingHoursOnWeekend").value),
        nightWorkingHoursDuringWeekend: parseFloat(this.form.get("nightWorkingHoursDuringWeekend").value),

        overtimeDuringWeekend: parseFloat(this.form.get("overtimeDuringWeekend").value),
        totalPaidDays: parseFloat(this.form.get("totalPaidDays").value),
        grossSalaryAll: parseFloat(this.form.get("grossSalaryAll").value),
        levelOfInsurance: parseFloat(this.form.get("levelOfInsurance").value),
        user_id: userId


    }

    let objectCalculation: any = {
      monthYear: this.form.get("monthYear") ? this.form.get("monthYear").value : null,
      calculations: calculation1

    }

    this.emploeyeeService.completeEmployee(objectCalculation).subscribe( (result) => {
      console.log("update11 ", result);

    })



  }

}