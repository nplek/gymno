<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockcardTransTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Stock card transaction
        Schema::create('stockcard_trans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('docnum',25);
            $table->string('acctcode',20)->nullable();
            $table->unsignedInteger('docentry')->nullable()->comment('Doc Entry Reference SAP B1');
            $table->string('doctype',1)
            ->comment('P=Goods receiptPO,G=Goods receipt,I=Goods Issue,R=Goods Return,T=Transfer,A=Adjust');
            $table->string('itemcode',20);
            $table->unsignedInteger('item_id')->nullable();
            $table->foreign('item_id')
                ->references('id')
                ->on('stockcards');
            $table->string('dscription',100);
            $table->string('whs_code',20);   //warehouse code
            $table->unsignedInteger('warehouse_id')->nullable();
            $table->foreign('warehouse_id')
                ->references('id')
                ->on('warehouses');
            $table->string('from_whs_code',20)->nullable();   //transfer to warehouse code
            $table->string('to_whs_code',20)->nullable();   //transfer to warehouse code
            $table->string('unit',16);
            $table->string('status',1)->default('N')
            ->comment('I=Update to inventory, N=Not update to inventory(error)');     //I=update to inventory, N=Not update to inventory(error)
            $table->double('qty',19,6);
            $table->double('price',19,6);
            $table->date('shipdate');
            $table->date('docdate');
            
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
        Schema::dropIfExists('stockcard_trans');
    }
}
