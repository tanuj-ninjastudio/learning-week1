import { Student, GraduateStudent } from "./models/Student.js";
import { StudentService } from "./services/StudentService.js";

const service = new StudentService();

service.add(new Student(1, "Tanuj", 26, "Computer Science"));
service.add(new GraduateStudent(2, "Naveen", 25, "Electrical Engineering", "Power Systems"));

service.list();
