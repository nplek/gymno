import { Department } from './department';
import { Position } from './position';

export class Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    mobile: string;
    phone: string;
    photo: string;
    email: string;
    employeeType: string;
    department: Department;
    position: Position;
    manager: Employee;
    active: string;
    created_at: string;
    updated_at: string;
}