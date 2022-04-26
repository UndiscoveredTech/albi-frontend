import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TAX } from '../shared/constants';
import { CompanyService } from '../_services/company.service';
import { EmployeeService } from '../_services/employee.service';
import { StaticMonthService } from '../_services/monthYearStatic.service';
import { UserService } from '../_services/user.service';


interface Calculation {
  monthlyNetSalary?: Number,
  grossOfNet?: Number,
  hourlyWage?: Number,
  normalWorkingHours?: Number,
  weekWorkinghours19_20?: Number,
  overtimeDuringWeek25?: Number,
  overtimeDuringWeek50?: Number,
  workingHoursOnWeekend?: Number,
  nightWorkingHoursDuringWeekend?: Number,
  overtimeWeekend?: Number,
  totalPaidDays?: Number,
  grossSalaryAll?: Number,
  levelOfInsurance?: Number,
  user_id?: String
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
      monthlyNetSalary: new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      totalPaidDays: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      normalWorkingHours: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      overtimeDuringWeek25: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      overtimeDuringWeek50: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      weekWorkinghours19_20: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      workingHoursOnWeekend: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      overtimeWeekend: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),


      // hourlyWage: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      

      // nightWorkingHoursDuringWeekend: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),

      // grossSalaryAll: new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      // levelOfInsurance: new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
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
                data.monthlyNetSalary ? this.form.controls['monthlyNetSalary'].setValue(data.monthlyNetSalary) : null;
                data.totalPaidDays ? this.form.controls['totalPaidDays'].setValue(data.totalPaidDays) : null;
                data.normalWorkingHours ? this.form.controls['normalWorkingHours'].setValue(data.normalWorkingHours) : null;
                data.overtimeDuringWeek25 ? this.form.controls['overtimeDuringWeek25'].setValue(data.overtimeDuringWeek25) : null;
                data.overtimeDuringWeek50 ? this.form.controls['overtimeDuringWeek50'].setValue(data.overtimeDuringWeek50) : null;
                data.weekWorkinghours19_20 ? this.form.controls['weekWorkinghours19_20'].setValue(data.weekWorkinghours19_20) : null;
                data.workingHoursOnWeekend ? this.form.controls['workingHoursOnWeekend'].setValue(data.workingHoursOnWeekend) : null;
                data.overtimeWeekend ? this.form.controls['overtimeWeekend'].setValue(data.overtimeWeekend) : null;


                // data.hourlyWage ? this.form.controls['hourlyWage'].setValue(data.hourlyWage) : null;
                

                

                // data.nightWorkingHoursDuringWeekend ? this.form.controls['nightWorkingHoursDuringWeekend'].setValue(data.nightWorkingHoursDuringWeekend) : null;

                // data.grossSalaryAll ? this.form.controls['grossSalaryAll'].setValue(data.grossSalaryAll) : null;
                // data.levelOfInsurance ? this.form.controls['levelOfInsurance'].setValue(data.levelOfInsurance) : null;

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
        monthlyNetSalary: this.form.get("monthlyNetSalary") ? parseFloat(this.form.get("monthlyNetSalary").value) : NaN,
        totalPaidDays: parseFloat(this.form.get("totalPaidDays").value),

        hourlyWage: this.form.get("hourlyWage") ? parseFloat(this.form.get("hourlyWage").value) : NaN,
        normalWorkingHours: parseFloat(this.form.get("normalWorkingHours").value),
        weekWorkinghours19_20: parseFloat(this.form.get("weekWorkinghours19_20").value),

        overtimeDuringWeek25: parseFloat(this.form.get("overtimeDuringWeek25").value),
        overtimeDuringWeek50: parseFloat(this.form.get("overtimeDuringWeek50").value),

        workingHoursOnWeekend: parseFloat(this.form.get("workingHoursOnWeekend").value),
        nightWorkingHoursDuringWeekend: parseFloat(this.form.get("nightWorkingHoursDuringWeekend").value),

        overtimeWeekend: parseFloat(this.form.get("overtimeWeekend").value),
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


  onCalculate(userId:any) {
   
    const netValue = this.form.get("monthlyNetSalary") ? parseFloat(this.form.get("monthlyNetSalary").value) : NaN
    const totalPaidDays = this.form.get("totalPaidDays") ? parseFloat(this.form.get("totalPaidDays").value) : NaN
    let bruto;
    let hourlyWage;
    bruto = (netValue - 3900)/(1 - TAX.SIGURIME_SHENDETSORE - TAX.SIGURIME_SHOQERORE - TAX.TAP_MID); 
    
    hourlyWage = bruto/(totalPaidDays*8);
    

    const calculation1: Calculation = {
      monthlyNetSalary: this.form.get("monthlyNetSalary") ? parseFloat(this.form.get("monthlyNetSalary").value) : NaN,
      normalWorkingHours: this.form.get("normalWorkingHours") ? parseFloat(this.form.get("normalWorkingHours").value) : NaN,
      weekWorkinghours19_20: this.form.get("weekWorkinghours19_20") ? parseFloat(this.form.get("weekWorkinghours19_20").value) : NaN,
      overtimeDuringWeek25: this.form.get("overtimeDuringWeek25") ? parseFloat(this.form.get("overtimeDuringWeek25").value) : NaN,
      overtimeDuringWeek50: this.form.get("overtimeDuringWeek50") ? parseFloat(this.form.get("overtimeDuringWeek50").value) : NaN,
      workingHoursOnWeekend: this.form.get("workingHoursOnWeekend") ? parseFloat(this.form.get("workingHoursOnWeekend").value) : NaN,
      overtimeWeekend: this.form.get("overtimeWeekend") ? parseFloat(this.form.get("overtimeWeekend").value) : NaN,
      grossOfNet: parseFloat(bruto.toFixed(2)),
      totalPaidDays: totalPaidDays,
      hourlyWage: parseFloat(hourlyWage.toFixed(2)),
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