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
        Schema::create('games', function (Blueprint $table) {
            $table->uuid('id');
            $table->timestamps();
//          The reference to the Users Table indicating the winner of the current game.
            $table->foreignUuid('winner')->nullable()->default(null);
//          A boolean indicating if the game is graded.
//          ( Winner will have his total points increased and losers will have theirs decreased).
            $table->boolean('graded')->default(false);
//          A JSON Object containing all the players currently playing, looking like {
//          Player1:{id:user_id,turn_no:random(1-total_players_count) : unique},
//          Player2{id:user_id,turn_no:random(1-total_players_count) : unique},etc...}.
            $table->json('players')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('games');
    }
};
