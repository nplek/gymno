import { Company } from './company';

export class Department {
    id: number;
    name: string;
    short_name: string;
    company: Company;
    company_id: number;
    active: string;
    created_at: string;
    updated_at: string;
}