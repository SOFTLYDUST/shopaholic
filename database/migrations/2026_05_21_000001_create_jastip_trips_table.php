<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jastip_trips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('origin_city');
            $table->string('origin_country')->default('Indonesia');
            $table->string('destination_city');
            $table->string('destination_country');
            $table->string('status'); // persiapan, sedang_di_perjalanan, open_po, checkout, sudah_kembali
            $table->date('departure_date');
            $table->string('transit_city')->nullable();
            $table->date('transit_date')->nullable();
            $table->date('estimated_return_date');
            $table->dateTime('order_deadline');
            $table->string('titip_estimation')->nullable();
            $table->decimal('origin_lat', 10, 7);
            $table->decimal('origin_lng', 10, 7);
            $table->decimal('destination_lat', 10, 7);
            $table->decimal('destination_lng', 10, 7);
            $table->decimal('transit_lat', 10, 7)->nullable();
            $table->decimal('transit_lng', 10, 7)->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jastip_trips');
    }
};
