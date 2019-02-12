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


        foreach(['001','002','003','004','005','006','007','008','009','010'] as $it){
            $company = Company::create([
                'name' => 'KTech' . $it ,
                'short_name' => 'KTECH'. $it,
            ]);
            $this->command->info('Create Company ' . $company->name);
        }

        foreach(['011','012','013','014','015','016','017','018','019','020'] as $it){
            $company = Company::create([
                'name' => 'KTech' . $it ,
                'short_name' => 'KTECH'. $it,
            ]);
            $this->command->info('Create Company ' . $company->name);
        }

        foreach(['021','022','023','024','025','026','027','028','029','030'] as $it){
            $company = Company::create([
                'name' => 'KTech' . $it ,
                'short_name' => 'KTECH'. $it,
            ]);
            $this->command->info('Create Company ' . $company->name);
        }
    }
}
