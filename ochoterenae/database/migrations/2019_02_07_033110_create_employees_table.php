<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('employee_id',10)->default("000000");
            $table->string('first_name',100)->nullable();
            $table->string('last_name',100)->nullable();
            $table->string('mobile',30)->nullable();
            $table->string('phone',30)->nullable();
            $table->string('email',100)->nullable();
            $table->string('photo')->nullable();
            $table->unsignedInteger('department_id')->nullable();
            $table->foreign('department_id')
                ->references('id')
                ->on('departments');
            $table->unsignedInteger('manager_id')->nullable();
            $table->foreign('manager_id')
                ->references('id')
                ->on('employees');
            $table->string('active',1)->default('I'); //A=Active, I=Inactive
            $table->string('type',1)->default('S'); //S=Staff, M=Manager
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
        Schema::dropIfExists('employees');
    }
}
