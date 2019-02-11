<?php

use Illuminate\Database\Seeder;
use App\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $location = Location::create([
            'name' => 'Head Office',
            'short_name' => 'HQ'
        ]);
        $this->command->info('Create Location ' . $location->name);
        $location = Location::create([
            'name' => 'Head Office/IT',
            'short_name' => 'IT'
        ]);
        $this->command->info('Create Location ' . $location->name);
        $location = Location::create([
            'name' => 'Head Office/Safty',
            'short_name' => 'SAFTY'
        ]);
        $this->command->info('Create Location ' . $location->name);
        $location = Location::create([
            'name' => 'Depot',
            'short_name' => 'DEPOT'
        ]);
        $this->command->info('Create Location ' . $location->name);
        $location = Location::create([
            'name' => 'Site/Amber',
            'short_name' => 'AMBER'
        ]);
        $this->command->info('Create Location ' . $location->name);
    }
}
