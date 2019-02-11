<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call([
            CompanySeeder::class,
            DepartmentSeeder::class,
            LocationSeeder::class,
            PositionSeeder::class,
            EmployeeSeeder::class,
            UnitSeeder::class,
            ItemSeeder::class,
            WarehouseSeeder::class,
            LaratrustSeeder::class
        ]);
    }
}
