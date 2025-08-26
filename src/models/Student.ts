import { IStudent } from "../types/IStudent.js";

export class Student implements IStudent {
  constructor(public id: number, public name: string, public age: number, public course: string) {}

  enroll() {
    console.log(`\n${this.name} enrolled in ${this.course}.`);
  }

  getDetails() {
    return `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, Course: ${this.course}`;
  }
}

export class GraduateStudent extends Student {
  constructor(id: number, name: string, age: number, course: string, public major: string) {
    super(id, name, age, course);
  }

  getDetails() {
    return `${super.getDetails()}, Major: ${this.major}`;
  }
}
