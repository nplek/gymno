<?php

use Illuminate\Database\Seeder;
use App\Warehouse;

class WarehouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Create Warehouse');
        $whs = Warehouse::create([
            'whs_code' => '10001',
            'whs_name' => 'Head Office - K Tech Construction',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '10002',
            'whs_name' => 'Depot Warehouse - K Tech Construction',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '10003',
            'whs_name' => 'Depot Chachoengsao',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '10004',
            'whs_name' => 'Safety',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '10005',
            'whs_name' => 'Depot Chachoengsao (DE2)',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '11001',
            'whs_name' => 'The Peak Tower / Pattaya',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '11002',
            'whs_name' => 'Mirage 27 Condominium / Sukhumvit 27',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '11003',
            'whs_name' => 'The Peak Tower / Pattaya',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '11004',
            'whs_name' => 'Plus 3 Condominium / Hat-Yai',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
        $whs = Warehouse::create([
            'whs_code' => '11005',
            'whs_name' => 'Plus 4 Condominium / Hat-Yai',
        ]);
        $this->command->info('Create ' . $whs->whs_code . ' ' . $whs->whs_name);
    }
}
