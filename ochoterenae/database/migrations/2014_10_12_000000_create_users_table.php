<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',50);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password',200);
            $table->rememberToken();
            $table->string('user_type',5)->default('ldap');     //email,ldap
            $table->string('active',1)->default('I'); //A=Active, I=Inactive, L=Lock
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip',60)->nullable();
            $table->timestamp('last_logout_at')->nullable();
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
        Schema::dropIfExists('users');
    }
}
