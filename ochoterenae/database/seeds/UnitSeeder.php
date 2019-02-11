<?php

use Illuminate\Database\Seeder;
use App\Unit;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('Create ItemUnit');
        $unit = Unit::create([
            'name' => 'pcs',
            'tname' => 'ชิ้น',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'tname' => 'กล่อง',
            'name' => 'boxes'
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'pacakge',
            'tname' => 'แพค',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'gram',
            'tname' => 'กรัม',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'kilogram',
            'tname' => 'กิโลกรัม',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'ton',
            'tname' => 'ตัน',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'เส้น',
            'tname' => 'เส้น',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'dozen',
            'tname' => 'โหล',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'centimeter',
            'tname' => 'เซนติเมตร',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'meter',
            'tname' => 'เมตร',
        ]);
        $this->command->info('Create ' . $unit->name);
        $unit = Unit::create([
            'name' => 'sq.meter',
            'tname' => 'ตร.ม.',
        ]);
        $this->command->info('Create ' . $unit->name);
    }
}
