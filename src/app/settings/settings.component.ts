import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { SettingsService } from '../_services/settings.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';



const COLUMNS_SCHEMA = [
  {
      key: "salary",
      type: "number",
      label: "Salary"
  },
  {
      key: "bonusDay",
      type: "number",
      label: "Bonus Day"
  },
  {
    key: "bonusNight",
    type: "number",
    label: "Bonus Night"
  },
 
]


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any;
  columnsSchema: any = COLUMNS_SCHEMA;

  constructor(private settingsService: SettingsService,  private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchAllSettings();
    
  }

  fetchAllSettings(){
    this.settingsService.getAllSettings().subscribe( (data) => {      
      this.dataSource = data;
      console.log(this.dataSource);

    })
  }

  updateAllSettings(){    
    this.settingsService.updateSettings(this.dataSource).subscribe( (data) => {      
      this.dataSource = data;
    })
  }

  onSubmit(){
    this.updateAllSettings();
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(NewSettingsDialoguComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = result.data
    });

  }
}

@Component({
  selector: 'new-settings-dialogu',
  templateUrl: './new-settings-dialogu.component.html',
})
export class NewSettingsDialoguComponent { 

  settingsForm: any;
  dataSource: any;
  constructor(
    public dialogRef: MatDialogRef<NewSettingsDialoguComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private settingsService: SettingsService
  ) {
    this.dataSource = data
    
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.settingsForm = new FormGroup({
      salary: new FormControl('', [Validators.required]),
      bonusDay: new FormControl('', [Validators.required]),
      bonusNight: new FormControl('', [Validators.required]),
      
    })
  }

  onSubmit(): void {
    
    let newsettings: any = {
      salary: this.settingsForm.get('salary') ? this.settingsForm.get('salary').value : null,
      bonusDay: this.settingsForm.get('bonusDay') ? this.settingsForm.get('bonusDay').value : null,
      bonusNight: this.settingsForm.get('bonusNight') ? this.settingsForm.get('bonusNight').value : null,
     
    }        
    this.settingsService.insertNewSalary(newsettings).subscribe((res) => {
      this.dialogRef.close({data: res});
    })
      

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

