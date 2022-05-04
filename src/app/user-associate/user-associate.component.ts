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
  overtimeDuringWeek25?: Number,
  overtimeDuringWeek50?: Number,
  weekWorkinghours19_20?: Number,
  workingHoursOnWeekend?: Number,
  overtimeWeekend?: Number,
  totalPaidDays?: Number,
  paidHoliday?: Number,
  grossSalaryAll?: Number,
  bonusBruto?: Number,
  brutoOfNewNetValue?: Number,
  levelOfSocInsurance?: Number,
  socInsurance?: Number,
  healthInsurance?: Number,
  totalInsurance?: Number,
  socInsuranceCOM?: Number,
  healthInsuranceCOM?: Number,
  totalInsuranceCOM?: Number,
  salaryBeforeIncomeLEK?: Number,
  incomeTax?: Number,
  netSalaryPlusBonus?: Number,
  netSalaryCOMAll?: Number,
  netSalaryCOMAEuro?: Number,
  costOfEmployer?: Number,
  agencyComision?: Number,
  totalWithoutVAT?: Number,
  VAT?: Number,
  totalWithVAT?: Number,

  
  exchangeRate?: Number,
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
      monthlyNetSalary: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      totalPaidDays: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      normalWorkingHours: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      overtimeDuringWeek25: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      overtimeDuringWeek50: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      weekWorkinghours19_20: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      workingHoursOnWeekend: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      overtimeWeekend: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      paidHoliday: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      exchangeRate: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),



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
                data.paidHoliday ? this.form.controls['paidHoliday'].setValue(data.paidHoliday) : null;
                data.exchangeRate ? this.form.controls['exchangeRate'].setValue(data.exchangeRate) : null;


              }
            })
        });


      })
    }
  }


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

        overtimeWeekend: parseFloat(this.form.get("overtimeWeekend").value),
        grossSalaryAll: parseFloat(this.form.get("grossSalaryAll").value),
        paidHoliday: parseFloat(this.form.get("paidHoliday").value),
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
   
    const netValueEU = this.form.get("monthlyNetSalary") ? parseFloat(this.form.get("monthlyNetSalary").value) : NaN
    const totalPaidDays = this.form.get("totalPaidDays") ? parseFloat(this.form.get("totalPaidDays").value) : NaN
    const normalWorkingHours = this.form.get("normalWorkingHours") ? parseFloat(this.form.get("normalWorkingHours").value) : NaN
    const weekWorkinghours19_20 = this.form.get("weekWorkinghours19_20") ? parseFloat(this.form.get("weekWorkinghours19_20").value) : NaN
    const overtimeDuringWeek25 = this.form.get("overtimeDuringWeek25") ? parseFloat(this.form.get("overtimeDuringWeek25").value) : NaN
    const overtimeDuringWeek50 = this.form.get("overtimeDuringWeek50") ? parseFloat(this.form.get("overtimeDuringWeek50").value) : NaN
    const workingHoursOnWeekend = this.form.get("workingHoursOnWeekend") ? parseFloat(this.form.get("workingHoursOnWeekend").value) : NaN
    const overtimeWeekend = this.form.get("overtimeWeekend") ? parseFloat(this.form.get("overtimeWeekend").value) : NaN
    const paidHoliday = this.form.get("paidHoliday") ? parseFloat(this.form.get("paidHoliday").value) : NaN
    const exchangeRate = this.form.get("exchangeRate") ? parseFloat(this.form.get("exchangeRate").value) : NaN
    let netValueLEK;
    let bruto;
    let hourlyWage;
    let grossSalaryAll;
    let bonusWeeklyNet;
    let bonusMonthlyNet;
    let bonusWeeklyGross;
    let levelOfSocInsurance;
    let socInsurance;
    let healthInsurance;
    let totalInsurance;
    let socInsuranceCOM;
    let healthInsuranceCOM;
    let totalInsuranceCOM;
    let salaryBeforeIncomeLEK;
    let incomeTax = 0;
    let netSalaryCOMAll;
    let netSalaryCOMEuro;
    let brutoOfNewNetValue;
    let netSalaryPlusBonus;
    let bonusBruto;
    let costOfEmployer;
    let agencyComision;
    let totalWithoutVAT;
    let VAT = 0;
    let totalWithVAT;
    debugger
    netValueLEK = netValueEU*exchangeRate;
    bruto = (netValueLEK - 3900)/(1 - TAX.SIGURIME_SHENDETSORE - TAX.SIGURIME_SHOQERORE - TAX.TAP_MID);
    
    hourlyWage = bruto/(totalPaidDays*8);

    grossSalaryAll = (hourlyWage*normalWorkingHours)+(hourlyWage*overtimeDuringWeek25*1.25)+(hourlyWage*overtimeDuringWeek50*1.5)+(hourlyWage*weekWorkinghours19_20*1.2)+(hourlyWage*workingHoursOnWeekend*1.25)+(hourlyWage*overtimeWeekend*1.5)+bruto/21*paidHoliday;
    if (grossSalaryAll > 132312){
      levelOfSocInsurance = 132312;
    }
    else if (grossSalaryAll < 30000){
      levelOfSocInsurance = 30000;
    } 
    else{
      levelOfSocInsurance = grossSalaryAll;
    }
    socInsurance = levelOfSocInsurance*TAX.SIGURIME_SHOQERORE;
    healthInsurance = levelOfSocInsurance*TAX.SIGURIME_SHENDETSORE;
    totalInsurance = socInsurance + healthInsurance;

    socInsuranceCOM = levelOfSocInsurance*0.15;
    healthInsuranceCOM = levelOfSocInsurance*TAX.SIGURIME_SHENDETSORE;
    totalInsuranceCOM = socInsuranceCOM + healthInsuranceCOM;

     



    if(grossSalaryAll > 30000 && grossSalaryAll < 150000){
      incomeTax = (grossSalaryAll - 30000)* TAX.TAP_MID;
    }
    else if(grossSalaryAll > 150000){
      incomeTax = (grossSalaryAll - 150000)*TAX.TAP_TOP + 15600;
    }
    else if(grossSalaryAll < 30000){
      incomeTax = 0;
    }

    netSalaryCOMAll = grossSalaryAll - totalInsurance - incomeTax;
    netSalaryCOMEuro = netSalaryCOMAll/exchangeRate;
    

    
    bonusWeeklyNet = ((netValueLEK/21*7*0.075)+(netValueLEK/21*7*0.25));
    bonusWeeklyGross = 
    bonusMonthlyNet = (netValueLEK/21*7);
    netSalaryPlusBonus = netSalaryCOMAll + bonusWeeklyNet;
    brutoOfNewNetValue = (netSalaryPlusBonus - 3900)/(1 - TAX.SIGURIME_SHENDETSORE - TAX.SIGURIME_SHOQERORE - TAX.TAP_MID); 
    bonusBruto = brutoOfNewNetValue - grossSalaryAll;
    costOfEmployer = (brutoOfNewNetValue + totalInsuranceCOM)/exchangeRate;
    agencyComision = costOfEmployer*0.09;
    totalWithoutVAT = costOfEmployer + agencyComision;
    totalWithVAT = totalWithoutVAT + VAT;
    salaryBeforeIncomeLEK = brutoOfNewNetValue;
    console.log(bonusBruto);


    const calculation1: Calculation = {
      monthlyNetSalary: netValueEU,
      grossOfNet: parseFloat(bruto.toFixed(2)),
      hourlyWage: parseFloat(hourlyWage.toFixed(2)),
      normalWorkingHours: normalWorkingHours,
      overtimeDuringWeek25: overtimeDuringWeek25,
      overtimeDuringWeek50: overtimeDuringWeek50,
      weekWorkinghours19_20: weekWorkinghours19_20,
      workingHoursOnWeekend: workingHoursOnWeekend,
      overtimeWeekend: overtimeWeekend,
      paidHoliday: paidHoliday,
      totalPaidDays: totalPaidDays,
      grossSalaryAll: parseFloat(grossSalaryAll.toFixed(2)),
      bonusBruto: bonusBruto,
      brutoOfNewNetValue: brutoOfNewNetValue,
      levelOfSocInsurance: levelOfSocInsurance,
      socInsurance: socInsurance,
      healthInsurance: healthInsurance,
      totalInsurance: totalInsurance,
      socInsuranceCOM: socInsuranceCOM,
      healthInsuranceCOM: healthInsuranceCOM,
      totalInsuranceCOM: totalInsuranceCOM,
      salaryBeforeIncomeLEK: salaryBeforeIncomeLEK,
      incomeTax: incomeTax,
      netSalaryCOMAll: netSalaryCOMAll,
      netSalaryCOMAEuro: netSalaryCOMEuro,
      netSalaryPlusBonus: netSalaryPlusBonus,
      totalWithoutVAT: totalWithoutVAT,
      costOfEmployer: costOfEmployer,
      agencyComision: agencyComision,
      VAT: VAT,
      totalWithVAT: totalWithVAT,

      exchangeRate: exchangeRate,
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