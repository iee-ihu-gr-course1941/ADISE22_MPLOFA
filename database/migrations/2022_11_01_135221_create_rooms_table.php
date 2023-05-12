<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('rooms', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('Name');
            $table->string('Password')->nullable();
            $table->boolean('InviteOnly')->default(false);
            $table->string('Invitation_Link');
            $table->integer("Capacity");
            $table->foreignUuid('OwnerId')->nullable();
            $table->foreignUuid('PlayerId')->nullable();
            $table->boolean('OwnerReady')->default(false);
            $table->boolean('PlayerReady')->default(false);
            $table->boolean('GameActive')->default(false);
            $table->foreignUuid('GameId')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('rooms');
    }
};
