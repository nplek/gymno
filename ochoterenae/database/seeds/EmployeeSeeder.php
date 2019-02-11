<?php

use Illuminate\Database\Seeder;
use App\Employee;
class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $employee = Employee::create([
            'employee_id' => '000001',
            'first_name' => 'Ayuporn',
            'last_name' => 'K',
            'mobile' => '0XX-YYY-ZZZZ',
            'department_id' => 1,
            'type' => 'M',
            'active' => 'A',
        ]);
        $this->command->info('Create Employee ' . $employee->employee_id);
        $employee = Employee::create([
            'employee_id' => '000002',
            'first_name' => 'Soravit',
            'last_name' => 'Ph',
            'mobile' => '0XX-YYY-ZZZZ',
            'manager_id' => 1,
            'department_id' => 1,
            'type' => 'M',
            'active' => 'A',
        ]);
        $this->command->info('Create Employee ' . $employee->employee_id);
        $employee = Employee::create([
            'employee_id' => '000003',
            'first_name' => 'Nopphawit',
            'last_name' => 'T',
            'mobile' => '0XX-YYY-ZZZZ',
            'manager_id' => 2,
            'department_id' => 2,
            'type' => 'M',
            'active' => 'A',
        ]);
        $this->command->info('Create Employee ' . $employee->employee_id);
        $employee = Employee::create([
            'employee_id' => '000004',
            'first_name' => 'Pakin',
            'last_name' => 'Y',
            'mobile' => '0XX-YYY-ZZZZ',
            'manager_id' => 3,
            'department_id' => 2,
            'type' => 'S',
            'active' => 'A',
        ]);
        $this->command->info('Create Employee ' . $employee->employee_id);
        $employee = Employee::create([
            'employee_id' => '000005',
            'first_name' => 'Nopasin',
            'last_name' => 'P',
            'mobile' => '0XX-YYY-ZZZZ',
            'manager_id' => 3,
            'type' => 'S',
            'active' => 'A',
        ]);
        $this->command->info('Create Employee ' . $employee->employee_id);
        $employee = Employee::create([
            'employee_id' => '000006',
            'first_name' => 'Ulailak',
            'last_name' => 'Na',
            'mobile' => '0XX-YYY-ZZZZ',
            'manager_id' => 3,
            'type' => 'S',
            'active' => 'A',
        ]);
        $this->command->info('Create Employee ' . $employee->employee_id);
    }
}
