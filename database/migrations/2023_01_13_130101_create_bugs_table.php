<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration  {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()    {
        Schema::create('bugs', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('user');
            $table->text('encountered_at');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()  {
        Schema::dropIfExists('bugs');
    }
};
