import { Role } from './role';
import { Employee } from './employee';
export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    user_type: string;
    active: string;
    roles: Role[];
    employee: Employee;
    employee_id: number;
    created_at: string;
    deleted_at: string;
}