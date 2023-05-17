import { Injectable } from '@angular/core';
import { Student } from '../_interfaces/Student';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  forms: Student[] = [
    {
      FormId: 1,
      FullName: {
        FirstName: "John",
        MiddleName: "Doe",
        LastName: "Smith",
      },
      Address: {
        Building: "A-1",
        Area: "B-2",
        City: 1,
        State: 1
      },
      Gender: "Male",
      Skills: ["C#", "Angular", "SQL"],
      S10th: {
        Marks: 90,
        Grade: "A",
        YearOfPassing: 2010
      },
      S12th: {
        Marks: 90,
        Grade: "A",
        YearOfPassing: 2012
      },
      Degree: {
        Marks: 90,
        Grade: "A",
        YearOfPassing: 2016
      }
    },
    {
      FormId: 2,
      FullName: {
        FirstName: "Jane",
        MiddleName: "Smith",
        LastName: "Doe",
      },
      Address: {
        Building: "B-3",
        Area: "C-4",
        City: 2,
        State: 2
      },
      Gender: "Female",
      Skills: ["Java", "Python", "HTML"],
      S10th: {
        Marks: 95,
        Grade: "A+",
        YearOfPassing: 2011
      },
      S12th: {
        Marks: 95,
        Grade: "A+",
        YearOfPassing: 2013
      },
      Degree: {
        Marks: 95,
        Grade: "A+",
        YearOfPassing: 2017
      }
    },
    {
      FormId: 3,
      FullName: {
        FirstName: "Michael",
        MiddleName: "Brown",
        LastName: "Johnson",
      },
      Address: {
        Building: "C-5",
        Area: "D-6",
        City: 3,
        State: 3
      },
      Gender: "Male",
      Skills: ["JavaScript", "React", "Node.js"],
      S10th: {
        Marks: 85,
        Grade: "A",
        YearOfPassing: 2012
      },
      S12th: {
        Marks: 85,
        Grade: "A",
        YearOfPassing: 2014
      },
      Degree: {
        Marks: 85,
        Grade: "A",
        YearOfPassing: 2018
      }
    },
    {
      FormId: 4,
      FullName: {
        FirstName: "Emily",
        MiddleName: "Davis",
        LastName: "Taylor",
      },
      Address: {
        Building: "D-7",
        Area: "E-8",
        City: 1,
        State: 1
      },
      Gender: "Female",
      Skills: ["Python", "Django", "MySQL"],
      S10th: {
        Marks: 95,
        Grade: "A+",
        YearOfPassing: 2010
      },
      S12th: {
        Marks: 95,
        Grade: "A+",
        YearOfPassing: 2012
      },
      Degree: {
        Marks: 95,
        Grade: "A+",
        YearOfPassing: 2016
      }
    }
  ];

  addForm(form: Student) {
    console.log(form);
    form.FormId = this.forms.length + 1;
    this.forms.push(form);
  }

  editForm(formId: number, form: Student) {
    
  }

  deleteForm(formId: number) {
    this.forms = this.forms.filter(x => x.FormId !== formId);
  }

  getForms() {
    return this.forms;
  }

  getForm(formId: number) : Student {
    return this.forms.find(x => x.FormId === formId) || {} as Student;
  }

  constructor() { }
}
