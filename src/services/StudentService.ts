import { Student, GraduateStudent } from "../models/Student.js";

export class StudentService {
  private students: (Student | GraduateStudent)[] = [];

  add(student: Student | GraduateStudent) {
    this.students.push(student);
    student.enroll();
  }

  list() {
    console.log("\nStudent List\n");
    this.students.forEach((s) => console.log(s.getDetails()));
  }
}
