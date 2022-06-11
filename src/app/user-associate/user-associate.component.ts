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
  netValueEU?: Number,
  grossOfNetAll?: Number,
  grossOfNetEuro?: Number,
  bonusBrutoDayShift?: Number,
  bonusBrutoNightShift?: Number,
  hourlyWage?: Number,
  normalWorkingHours?: Number,
  overtimeDuringWeek25Day?: Number,
  overtimeDuringWeek25Night?: Number,
  overtimeDuringWeek50?: Number,
  weekWorkinghours19_20?: Number,
  workingHoursOnWeekendDay?: Number,
  workingHoursOnWeekendNight?: Number,
  overtimeWeekend?: Number,
  annualLeave?: Number,
  sickDays?: Number,
  totalPaidDay?: Number,
  totalPaidNight?: Number,
  totalPaidDays?: Number,
  perdiems?: Number,
  transport?: Number,
  hotel?: Number,
  grossSalaryAll?: Number,
  bonusBrutoDayShiftF1?: Number,
  bonusBrutoNightShiftF2?: Number,
  grossSalaryAllTotal?: Number,
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
  emploeyeeName?: String,
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
      bankaccount: new FormControl({value: '', disabled: true}, [Validators.required]),
      company: new FormControl({value: '', disabled: true}, [Validators.required]),
      monthYear: new FormControl('',[Validators.required]),
      netValueEU: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      bonusBrutoDayShift: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      bonusBrutoNightShift: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      normalWorkingHours: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      overtimeDuringWeek25Day: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      overtimeDuringWeek25Night: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      overtimeDuringWeek50: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      weekWorkinghours19_20: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      workingHoursOnWeekendDay: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      workingHoursOnWeekendNight: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      overtimeWeekend: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      annualLeave: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      sickDays: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      totalPaidDay: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      totalPaidNight: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      perdiems: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      transport: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      hotel: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      totalPaidDays: new FormControl('',[Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
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
        data.bankaccount ? this.form.get('bankaccount').setValue(data.bankaccount) : null;
        this.companyService.singleCompany(data.company).subscribe( (dataCompany) => {                        
          dataCompany.name ? this.form.controls['company'].setValue(dataCompany.name) : null;
        })

        this.staticMonth.getIdByMonthAndYear(month,year).subscribe(data => {
          data._id ? this.form.controls['monthYear'].setValue(data._id) : null;
            monthYearId = data._id;
            this.emploeyeeService.getCalculationForUserAndYearMonth(monthYearId,this.userId).subscribe( (data) => {      
              if(data){
                data.netValueEU != null ? this.form.controls['netValueEU'].setValue(data.netValueEU) : null;
                data.bonusBrutoDayShift != null ? this.form.controls['bonusBrutoDayShift'].setValue(data.bonusBrutoDayShift) : null;
                data.bonusBrutoNightShift != null ? this.form.controls['bonusBrutoNightShift'].setValue(data.bonusBrutoNightShift) : null;
                data.normalWorkingHours != null ? this.form.controls['normalWorkingHours'].setValue(data.normalWorkingHours) : null;
                data.overtimeDuringWeek25Day != null ? this.form.controls['overtimeDuringWeek25Day'].setValue(data.overtimeDuringWeek25Day) : null;
                data.overtimeDuringWeek25Night != null ? this.form.controls['overtimeDuringWeek25Night'].setValue(data.overtimeDuringWeek25Night) : null;
                data.overtimeDuringWeek50 != null ? this.form.controls['overtimeDuringWeek50'].setValue(data.overtimeDuringWeek50) : null;
                data.weekWorkinghours19_20 != null ? this.form.controls['weekWorkinghours19_20'].setValue(data.weekWorkinghours19_20) : null;
                data.workingHoursOnWeekendDay != null ? this.form.controls['workingHoursOnWeekendDay'].setValue(data.workingHoursOnWeekendDay) : null;
                data.workingHoursOnWeekendNight != null ? this.form.controls['workingHoursOnWeekendNight'].setValue(data.workingHoursOnWeekendNight) : null;
                data.overtimeWeekend != null ? this.form.controls['overtimeWeekend'].setValue(data.overtimeWeekend) : null;
                data.annualLeave != null ? this.form.controls['annualLeave'].setValue(data.annualLeave) : null;
                data.sickDays != null ? this.form.controls['sickDays'].setValue(data.sickDays) : null;
                data.totalPaidDay != null ? this.form.controls['totalPaidDay'].setValue(data.totalPaidDay) : null;
                data.totalPaidNight != null ? this.form.controls['totalPaidNight'].setValue(data.totalPaidNight) : null;
                data.totalPaidDays != null ? this.form.controls['totalPaidDays'].setValue(data.totalPaidDays) : null;
                data.perdiems != null ? this.form.controls['perdiems'].setValue(data.perdiems) : null;
                data.transport != null ? this.form.controls['transport'].setValue(data.transport) : null;
                data.hotel != null ? this.form.controls['hotel'].setValue(data.hotel) : null;
                data.exchangeRate != null ? this.form.controls['exchangeRate'].setValue(data.exchangeRate) : null;
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
  




  onCalculate(userId:any) {
    let emploeyeeName = this.form.get("name").value;

   
    const netValueEU = this.form.get("netValueEU") ? parseFloat(this.form.get("netValueEU").value) : NaN
    const bonusBrutoDayShift = this.form.get("bonusBrutoDayShift") ? parseFloat(this.form.get("bonusBrutoDayShift").value) : NaN
    const bonusBrutoNightShift = this.form.get("bonusBrutoNightShift") ? parseFloat(this.form.get("bonusBrutoNightShift").value) : NaN
    const normalWorkingHours = this.form.get("normalWorkingHours") ? parseFloat(this.form.get("normalWorkingHours").value) : NaN
    const overtimeDuringWeek25Day = this.form.get("overtimeDuringWeek25Day") ? parseFloat(this.form.get("overtimeDuringWeek25Day").value) : NaN
    const overtimeDuringWeek25Night = this.form.get("overtimeDuringWeek25Night") ? parseFloat(this.form.get("overtimeDuringWeek25Night").value) : NaN
    const overtimeDuringWeek50 = this.form.get("overtimeDuringWeek50") ? parseFloat(this.form.get("overtimeDuringWeek50").value) : NaN
    const weekWorkinghours19_20 = this.form.get("weekWorkinghours19_20") ? parseFloat(this.form.get("weekWorkinghours19_20").value) : NaN
    const workingHoursOnWeekendDay = this.form.get("workingHoursOnWeekendDay") ? parseFloat(this.form.get("workingHoursOnWeekendDay").value) : NaN
    const workingHoursOnWeekendNight = this.form.get("workingHoursOnWeekendNight") ? parseFloat(this.form.get("workingHoursOnWeekendNight").value) : NaN
    const overtimeWeekend = this.form.get("overtimeWeekend") ? parseFloat(this.form.get("overtimeWeekend").value) : NaN
    const annualLeave = this.form.get("annualLeave") ? parseFloat(this.form.get("annualLeave").value) : NaN
    const sickDays = this.form.get("sickDays") ? parseFloat(this.form.get("sickDays").value) : NaN
    const totalPaidDay = this.form.get("totalPaidDay") ? parseFloat(this.form.get("totalPaidDay").value) : NaN
    const totalPaidNight = this.form.get("totalPaidNight") ? parseFloat(this.form.get("totalPaidNight").value) : NaN
    const totalPaidDays = this.form.get("totalPaidDays") ? parseFloat(this.form.get("totalPaidDays").value) : NaN
    const perdiems = this.form.get("perdiems") ? parseFloat(this.form.get("perdiems").value) : NaN
    const transport = this.form.get("transport") ? parseFloat(this.form.get("transport").value) : NaN
    const hotel = this.form.get("hotel") ? parseFloat(this.form.get("hotel").value) : NaN
    const exchangeRate = this.form.get("exchangeRate") ? parseFloat(this.form.get("exchangeRate").value) : NaN
   
    let netValueLEK = 0;
    let bruto = 0;
    let grossOfNetAll = 0;
    let grossOfNetEuro = 0;
    let hourlyWage = 0;
    let grossSalaryAll = 0;
    let levelOfSocInsurance = 0;
    let socInsurance = 0;
    let healthInsurance = 0;
    let totalInsurance = 0;
    let socInsuranceCOM = 0;
    let healthInsuranceCOM = 0;
    let totalInsuranceCOM = 0;
    let incomeTax = 0;
    let netSalaryCOMAll = 0;
    let netSalaryCOMEuro = 0;
    let netSalaryPlusBonus = 0;
    let costOfEmployer = 0;
    let agencyComision = 0;
    let totalWithoutVAT = 0;
    let VAT = 0;
    let totalWithVAT = 0;

    netValueLEK = netValueEU*exchangeRate;
    bruto = (netValueLEK - 3900)/(1 - TAX.SIGURIME_SHENDETSORE - TAX.SIGURIME_SHOQERORE - TAX.TAP_MID);
    grossOfNetAll = bruto;
    grossOfNetEuro = bruto/exchangeRate;
    hourlyWage = bruto/(21*8);

    grossSalaryAll = (hourlyWage*normalWorkingHours)+(hourlyWage*overtimeDuringWeek25Day*1.25)+(hourlyWage*overtimeDuringWeek25Night*1.25)+(hourlyWage*overtimeDuringWeek50*1.5)+(hourlyWage*weekWorkinghours19_20*1.2)+(hourlyWage*workingHoursOnWeekendDay*1.25)+(hourlyWage*workingHoursOnWeekendNight*1.5)+(hourlyWage*overtimeWeekend*1.5)+(bruto/21*annualLeave)+(bruto/21*sickDays*0.7);
    
    let bonusBrutoDayShiftF1 = bonusBrutoDayShift/14*totalPaidDay;
    let bonusBrutoNightShiftF2 = bonusBrutoNightShift/14*totalPaidNight;

    let grossSalaryAllTotal = grossSalaryAll + bonusBrutoDayShiftF1 + bonusBrutoNightShiftF2;
    if (grossSalaryAllTotal > 141133){
      levelOfSocInsurance = 141133;
    }
    else if (grossSalaryAllTotal < 32000){
      levelOfSocInsurance = 32000;
      
    } 
    else{
      levelOfSocInsurance = grossSalaryAllTotal;
    }
    socInsurance = levelOfSocInsurance*TAX.SIGURIME_SHOQERORE;
    healthInsurance = grossSalaryAllTotal*TAX.SIGURIME_SHENDETSORE;
    totalInsurance = socInsurance + healthInsurance;

    socInsuranceCOM = levelOfSocInsurance*0.15;
    healthInsuranceCOM = grossSalaryAllTotal*TAX.SIGURIME_SHENDETSORE;
    totalInsuranceCOM = socInsuranceCOM + healthInsuranceCOM;

     



    if(grossSalaryAllTotal > 30000 && grossSalaryAllTotal < 200000){
      incomeTax = (grossSalaryAllTotal - 30000)* TAX.TAP_MID;
    }
    else if(grossSalaryAllTotal > 200000){
      incomeTax = (grossSalaryAllTotal - 200000)*TAX.TAP_TOP + 22100;
    }
    else if(grossSalaryAllTotal < 30000){
      incomeTax = 0;
    }

    netSalaryCOMAll = grossSalaryAllTotal - totalInsurance - incomeTax;
    netSalaryCOMEuro = netSalaryCOMAll/exchangeRate;
    

    
    
    costOfEmployer = (grossSalaryAllTotal + totalInsuranceCOM)/exchangeRate;
    agencyComision = costOfEmployer*0.09;
    totalWithoutVAT = costOfEmployer + agencyComision;
    VAT = totalWithoutVAT*0.2;
    totalWithVAT = totalWithoutVAT + VAT;
    
    
      

    const calculation1: Calculation = {
      
      netValueEU: parseFloat(netValueEU.toFixed(2)),
      bonusBrutoDayShift: parseFloat(bonusBrutoDayShift.toFixed(2)),
      bonusBrutoNightShift: parseFloat(bonusBrutoNightShift.toFixed(2)),
      grossOfNetAll: parseFloat(grossOfNetAll.toFixed(2)),
      grossOfNetEuro: parseFloat(grossOfNetEuro.toFixed(2)),
      hourlyWage: parseFloat(hourlyWage.toFixed(2)),
      normalWorkingHours: normalWorkingHours,
      overtimeDuringWeek25Day: overtimeDuringWeek25Day,
      overtimeDuringWeek25Night: overtimeDuringWeek25Night,
      overtimeDuringWeek50: overtimeDuringWeek50,
      weekWorkinghours19_20: weekWorkinghours19_20,
      workingHoursOnWeekendDay: workingHoursOnWeekendDay,
      workingHoursOnWeekendNight: workingHoursOnWeekendNight,
      overtimeWeekend: overtimeWeekend,
      annualLeave:annualLeave,
      sickDays:sickDays,
      totalPaidDay: totalPaidDay,
      totalPaidNight: totalPaidNight,
      totalPaidDays: totalPaidDays,
      perdiems: perdiems,
      bonusBrutoDayShiftF1: parseFloat(bonusBrutoDayShiftF1.toFixed(2)),
      bonusBrutoNightShiftF2: parseFloat(bonusBrutoNightShiftF2.toFixed(2)),
      transport: transport,
      hotel: hotel,
      grossSalaryAll: parseFloat(grossSalaryAll.toFixed(2)),
      grossSalaryAllTotal: parseFloat(grossSalaryAllTotal.toFixed(2)),
      levelOfSocInsurance: parseFloat(levelOfSocInsurance.toFixed(2)),
      socInsurance: parseFloat(socInsurance.toFixed(0)),
      healthInsurance: parseFloat(healthInsurance.toFixed(0)),
      totalInsurance: parseFloat(totalInsurance.toFixed(0)),
      socInsuranceCOM: parseFloat(socInsuranceCOM.toFixed(0)),
      healthInsuranceCOM: parseFloat(healthInsuranceCOM.toFixed(0)),
      totalInsuranceCOM: parseFloat(totalInsuranceCOM.toFixed(0)),
      incomeTax: parseFloat(incomeTax.toFixed(0)),
      netSalaryCOMAll: parseFloat(netSalaryCOMAll.toFixed(0)),
      netSalaryCOMAEuro: parseFloat(netSalaryCOMEuro.toFixed(2)),
      netSalaryPlusBonus: parseFloat(netSalaryPlusBonus.toFixed(2)),
      totalWithoutVAT: parseFloat(totalWithoutVAT.toFixed(2)),
      costOfEmployer: parseFloat(costOfEmployer.toFixed(2)),
      agencyComision: parseFloat(agencyComision.toFixed(2)),
      VAT: parseFloat(VAT.toFixed(2)),
      totalWithVAT: parseFloat(totalWithVAT.toFixed(2)),
      exchangeRate: exchangeRate,
      emploeyeeName: emploeyeeName,
      user_id: userId
    }

    let objectCalculation: any = {
      monthYear: this.form.get("monthYear") ? this.form.get("monthYear").value : null,
      calculations: calculation1,
    }

    this.emploeyeeService.completeEmployee(objectCalculation).subscribe( (result) => {

    })
  }

  
}