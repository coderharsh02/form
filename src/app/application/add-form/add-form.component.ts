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

  states: State[] = [];
  cities: City[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ApplicationForm!: FormGroup;

  ngOnInit() {
    this.ApplicationForm = this.fb.group({
      // FormId: [''],
      FullName: this.fb.group({
        FirstName: [''],
        MiddleName: [''],
        LastName: [''],
      }),
      EmaiID: [''],
      Address: this.fb.group({
        Building: [''],
        Area: [''],
        State: [''],
        City: [''],
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

    this.dataService.findStates().subscribe({
      next: (res) => {
        this.states = res;
      },
    });

    let formId = parseInt(this.route.snapshot.paramMap.get('formId') || '-1');
    if (formId != -1) {
      this.loadAPIData(formId);
    }

    const stateControl = this.ApplicationForm.get('Address.State');
    stateControl?.valueChanges.forEach((value: number) =>
      this.dataService.findCityByID(value).subscribe({
        next: (res) => {
          this.cities = res;
        },
      })
    );
  }

  get skills() {
    return this.ApplicationForm.get('Skills') as FormArray;
  }

  addMoreSkills() {
    this.skills.push(this.fb.control(''));
  }

  get firstName() {
    return this.ApplicationForm.get('fullName.firstName');
  }

  get state() {
    return this.ApplicationForm.get('Address.State');
  }

  onSubmit(x: Student) {
    console.log(this.ApplicationForm.value);
    this.formService.addForm(x);
  }

  loadAPIData(formId: number) {
    this.ApplicationForm.patchValue(
      // {
      //   FullName: {
      //     FirstName: "Harsh",
      //     MiddleName: "Manishbhai",
      //     LastName: "Shah"
      //   },
      //   EmaiID: "harsh@12.ca",
      //   Address: {
      //     Building: "Vijay Complex",
      //     Area: "Vasna",
      //     State: "",
      //     City: ""
      //   },
      //   Gender: "Male",
      //   Skills: ["c", "c++"],
      //   S10th: { Marks: 84, Grade: 'A', YearOfPassing: 2017 },
      //   S12th: { Marks: 86, Grade: 'A', YearOfPassing: 2019 },
      //   Degree:{ Marks: 10, Grade: 'A', YearOfPassing: 2023 }
      // }
      this.formService.getForm(formId)
    );
  }
}
