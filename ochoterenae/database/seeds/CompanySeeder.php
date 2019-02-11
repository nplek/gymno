<?php

use Illuminate\Database\Seeder;
use App\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $company = Company::create([
            'name' => 'KTech Construction pcl.',
            'short_name' => 'KCONS',
        ]);
        $this->command->info('Create Company ' . $company->name);
        $company = Company::create([
            'name' => 'KTech Building Contactor',
            'short_name' => 'KBUILD',
        ]);
        $this->command->info('Create Company ' . $company->name);
        $company = Company::create([
            'name' => 'KTech Infrastructure',
            'short_name' => 'KINFA',
        ]);
        $this->command->info('Create Company ' . $company->name);
        $company = Company::create([
            'name' => 'KTech Innovation',
            'short_name' => 'KINNO',
        ]);
        $this->command->info('Create Company ' . $company->name);
    }
}
