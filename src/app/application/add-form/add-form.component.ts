import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/_interfaces/City';
import { State } from 'src/app/_interfaces/State';
import { Student } from 'src/app/_interfaces/Student';
import { DataService } from 'src/app/_services/data.service';
import { FormService } from 'src/app/_services/form.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
  @Input() role = '';

  FormId: number = -1;

  states: State[] = [];
  cities: City[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ApplicationForm!: FormGroup;

  ngOnInit() {
    this.ApplicationForm = this.fb.group({
      FormId: { value: -1, disabled: true },
      FullName: this.fb.group({
        FirstName: [''],
        MiddleName: [''],
        LastName: [''],
      }),
      EmailID: [''],
      Address: this.fb.group({
        Building: [''],
        Area: [''],
        State: [-1],
        City: [-1],
      }),
      Gender: ['male'],
      Skills: this.fb.array([]),
      S10th: this.fb.group({
        Marks: [0],
        Grade: [''],
        YearOfPassing: [0],
      }),
      S12th: this.fb.group({
        Marks: [0],
        Grade: [''],
        YearOfPassing: [0],
      }),
      Degree: this.fb.group({
        Marks: [0],
        Grade: [''],
        YearOfPassing: [0],
      }),
    });

    this.FormId = parseInt(this.route.snapshot.paramMap.get('formId') || '-1');

    if (this.FormId == -1) {
      this.setStates();
    }
    else {
      this.loadAPIData(this.FormId);
      this.setStates();
      this.setCities(this.state?.value);
    }

    const stateControl = this.ApplicationForm.get('Address.State');
    stateControl?.valueChanges.forEach((value: number) => {
      this.city?.setValue('-1');
      this.setCities(value)
    });
  }

  setCities(stateId: number) {
    this.dataService.findCityByID(stateId).subscribe({
      next: (res) => {
        this.cities = res;
      },
    })
  }

  setStates() {
    this.dataService.findStates().subscribe({
      next: (res) => {
        this.states = res;
      },
    })
  }

  get skills() {
    return this.ApplicationForm.get('Skills') as FormArray;
  }


  get firstName() {
    return this.ApplicationForm.get('fullName.firstName');
  }

  get city() {
    return this.ApplicationForm.get('Address.City');
  }

  get state() {
    return this.ApplicationForm.get('Address.State');
  }

  addMoreSkills() {
    this.skills.push(this.fb.control(''));
  }

  onSubmit(x: Student) {
    console.log(this.ApplicationForm.value);
    this.formService.addForm(x);
  }

  saveChanges(x: Student) {
    this.formService.editForm(this.FormId, x);
  }

  loadAPIData(formId: number) {

    if (formId == 0) {
      this.addMoreSkills();
      this.addMoreSkills();
      this.ApplicationForm.patchValue(
        {
          FullName: {
            FirstName: "Harsh",
            MiddleName: "Manishbhai",
            LastName: "Shah"
          },
          EmailID: "harsh@12.ca",
          Address: {
            Building: "Vijay Complex",
            Area: "Vasna",
            State: 1,
            City: 2
          },
          Gender: "Male",
          Skills: ["c", "c++"],
          S10th: { Marks: 84, Grade: 'A', YearOfPassing: 2017 },
          S12th: { Marks: 86, Grade: 'A', YearOfPassing: 2019 },
          Degree: { Marks: 10, Grade: 'A', YearOfPassing: 2023 }
        }
      );
    }
    else {
      let form = this.formService.getForm(formId);
      console.log(form);

      form.Skills.forEach((skill: string) => {
        this.addMoreSkills();
      });

      this.ApplicationForm.patchValue(form);
    }
  }
}
