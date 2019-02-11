<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockcardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stockcards', function (Blueprint $table) {
            $table->increments('id');
            $table->string('itemcode',20);
            $table->string('name',100)->nullable();
            $table->string('dscription',200)->nullable();
            $table->string('whs_code',20);
            $table->unsignedInteger('warehouse_id')->nullable();
            $table->foreign('warehouse_id')
                ->references('id')
                ->on('warehouses');
            $table->string('unit_name',16);
            $table->double('max_qty',19,6)->default(0);
            $table->double('min_qty',19,6)->default(0);
            $table->double('qty',19,6)->default(0);
            $table->double('price',19,6)->default(0);
            $table->double('average_price',19,6)->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stockcards');
    }
}
