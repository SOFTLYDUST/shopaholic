<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('order_number', 20)->nullable()->unique()->after('id');
            $table->string('tracking_status')->default('pesanan_diterima')->after('status');
            $table->string('service_name')->default('Jasa Titip Luar Negeri')->after('tracking_status');
            $table->string('destination_country')->default('Indonesia')->after('service_name');
            $table->string('source_country')->nullable()->after('destination_country');
            $table->timestamp('last_tracking_at')->nullable()->after('source_country');
        });

        foreach (DB::table('orders')->orderBy('id')->get() as $order) {
            DB::table('orders')->where('id', $order->id)->update([
                'order_number' => sprintf('TYA%09d', $order->id),
                'tracking_status' => 'pesanan_diterima',
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'order_number',
                'tracking_status',
                'service_name',
                'destination_country',
                'source_country',
                'last_tracking_at',
            ]);
        });
    }
};
