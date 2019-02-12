import { Company } from './company';

export class Department {
    depId: number;
    name: string;
    short_name: string;
    company: Company;
    active: string;
    created_at: string;
    updated_at: string;
}