
import { EducationDetail } from "./EducationDetail";

export interface Student {
    FormId: number;
    FullName: {
        FirstName: string;
        MiddleName: string;
        LastName: string;
    }
    Address: {
        Building: string;
        Area: string;
        City: number;
        State: number;
    }
    Gender: string;
    Skills: Array<string>;
    S10th: EducationDetail;
    S12th: EducationDetail;
    Degree: EducationDetail;  
}