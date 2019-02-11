<?php

use Illuminate\Database\Seeder;
use App\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $department = Department::create([
            'name' => 'Unassigned',
            'short_name' => 'UNAS',
            'company_id' => 1,
        ]);
        $this->command->info('Create Department ' . $department->name);
        $department = Department::create([
            'name' => 'IT Department',
            'short_name' => 'ITD',
            'company_id' => 1,
        ]);
        $this->command->info('Create Department ' . $department->name);
        $department = Department::create([
            'name' => 'Purchase Department',
            'short_name' => 'PRD',
            'company_id' => 1,
        ]);
        $this->command->info('Create Department ' . $department->name);
        $department = Department::create([
            'name' => 'Site',
            'short_name' => 'Site',
            'company_id' => 2,
        ]);
        $this->command->info('Create Department ' . $department->name);
    }
}
