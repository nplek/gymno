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
    type: string;
    department_id: number;
    department: Department;
    positions: Position[];
    manager_id: number;
    manager: Employee;
    active: string;
    created_at: string;
    updated_at: string;
}