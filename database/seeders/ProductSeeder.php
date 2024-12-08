<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Crear productos con datos falsos
        foreach (range(1, 20) as $index) {
            DB::table('products')->insert([
                'nombre' => $faker->word,
                'descripcion' => $faker->sentence,
                'precio' => $faker->randomFloat(2, 10, 100),  // Precio aleatorio entre 10 y 100
                'cantidad' => $faker->numberBetween(1, 50),  // Cantidad aleatoria entre 1 y 50
                'image' => $faker->imageUrl(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
