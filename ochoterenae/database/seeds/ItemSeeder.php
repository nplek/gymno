<?php

use Illuminate\Database\Seeder;
use App\Item;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $item = Item::create([
            'item_code' => 'ITM-0001',
            'name' => 'Item 0001',
            'description' => 'Desc 0001',
            'unit_name' => 'pcs',
        ]);
        $this->command->info('Create Item ' . $item->item_code);
        $item = Item::create([
            'item_code' => 'STL-0002',
            'name' => 'Steel 0002',
            'description' => 'Desc 0002',
            'unit_name' => 'kilogram',
        ]);
        $this->command->info('Create Item ' . $item->item_code);
        $item = Item::create([
            'item_code' => 'REB-0003',
            'name' => 'Rebel 003',
            'description' => 'Rebel',
            'unit_name' => 'gram',
        ]);
        $this->command->info('Create Item ' . $item->item_code);

        foreach(['ITM-002','ITM-003','ITM-004','ITM-005','ITM-006','ITM-007','ITM-008','ITM-009','ITM-010'] as $it){
            $item = Item::create([
                'item_code' => $it,
                'name' => 'I' . $it,
                'description' => $it,
                'unit_name' => 'pcs',
            ]);
            $this->command->info('Create Item ' . $item->item_code);
        }
    }
}
