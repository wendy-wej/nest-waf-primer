import { CreateUserDto } from "../../../student-registration/users/dto/create-user.dto";
import { ModeOfEntry } from "../../../student-registration/studentRegistration.types";

export class CreateStudentDto {
    readonly department: string;
    readonly matriculationNumber: string;
    readonly modeOfEntry: ModeOfEntry;
    readonly programOfStudy: string;
    readonly yearOfEntry: number;
    readonly user: CreateUserDto; //In case you want to create a user along with studen
}
