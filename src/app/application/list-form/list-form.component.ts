import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/_interfaces/Student';
import { DataService } from 'src/app/_services/data.service';
import { FormService } from 'src/app/_services/form.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit {
  @Input() role = '';

  forms: Student[] = [];

  constructor(private formService: FormService, private router: Router, private dataService: DataService) { }
  ngOnInit(): void {
    this.getForms();
  }

  getForms() {
    this.forms = this.formService.getForms();
  }

  editForm(formId: number) {
    this.router.navigateByUrl(`/edit-form/${formId}`);
  }

  deleteForm(formId: number) {
    this.formService.deleteForm(formId);
    this.getForms();
  } 

  getCityAndStateName(stateId: number, cityId: number) {
    return this.dataService.getCityAndStateByID(stateId, cityId);
  }
}
