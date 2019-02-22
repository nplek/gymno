import { Permission } from '../data/permission';
export class Role {
    id: number;
    name: string;
    display_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission;
}