<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocNumbersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc_numbers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',30);
            $table->string('short_name',30)->unique();
            $table->string('prefix',8)->nullable();
            $table->string('suffix',8)->nullable();
            $table->unsignedInteger('digit_num')->default(5);
            $table->unsignedInteger('start_num')->default(1);
            $table->unsignedInteger('current_num')->default(0);
            $table->unsignedInteger('end_num')->default(99999);
            $table->unsignedInteger('next_num')->default(1);
            $table->string('doc_format',50);
            $table->string('doc_year',4)->default('2018');
            $table->string('doc_month',2)->default('01');
            $table->string('year_reset_num',1)->default('Y');
            $table->string('month_reset_num',1)->default('N');
            $table->string('delimiter',1)->default('-');
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
        Schema::dropIfExists('doc_numbers');
    }
}
