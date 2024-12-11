<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class productController extends Controller
{
    public function index()
{
    $products = Product::all();
    
    // Convertir las rutas de las imágenes a URLs accesibles
    $products->each(function ($product) {
        $product->image = $product->image ? asset($product->image) : null;
    });

    return response()->json([
        'products' => $products,
    ], 200);
}

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nombre' => 'required|max:255',
        'descripcion' => 'required|max:255',
        'precio' => 'required|numeric',
        'cantidad' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'mensaje' => 'Error en la validación de los datos',
            'errors' => $validator->errors(),
            'status' => 400,
        ], 400);
    }

    $imagePath = null;
    if ($request->hasFile('image') && $request->file('image')->isValid()) {
        // Guardar la imagen en el directorio 'products' dentro de 'storage/app/public'
        $imagePath = $request->file('image')->store('products', 'public');
    }

    // Crear el producto
    $product = Product::create([
        'nombre' => $request->nombre,
        'descripcion' => $request->descripcion,
        'precio' => $request->precio,
        'cantidad' => $request->cantidad,
        'image' => $imagePath ? 'storage/' . $imagePath : null,
    ]);

    return response()->json($product, 201);

}


public function uploadImage(Request $request)
{
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('public/images');
        $url = Storage::url($path);
        return response()->json(['url' => $url]);
    }

    return response()->json(['error' => 'No se subió ninguna imagen'], 400);
}
    

public function show($id)
{
    $product = Product::find($id);

    if ($product) {
        // Convertir la ruta de la imagen a una URL accesible
        $product->image = $product->image ? asset($product->image) : null;

        return response()->json([
            'product' => $product,
            'status' => 200,
        ], 200);
    } else {
        return response()->json([
            'mensaje' => 'Producto no encontrado',
            'status' => 404,
        ], 404);
    }
}


    public function update(Request $request, $id)
{
    $product = Product::find($id);
    if (!$product) {
        return response()->json([
            'mensaje' => 'Producto no encontrado',
            'status' => 404,
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'nombre' => 'nullable|max:255',
        'descripcion' => 'nullable|max:255',
        'precio' => 'nullable|numeric',
        'cantidad' => 'nullable|integer',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'mensaje' => 'Error en la validación de los datos',
            'errors' => $validator->errors(),
            'status' => 400,
        ], 400);
    }

    // Actualizar campos si están presentes
    if ($request->has('nombre')) $product->nombre = $request->nombre;
    if ($request->has('descripcion')) $product->descripcion = $request->descripcion;
    if ($request->has('precio')) $product->precio = $request->precio;
    if ($request->has('cantidad')) $product->cantidad = $request->cantidad;

    
    
    
    

    $product->save();

    return response()->json([
        'mensaje' => 'Producto actualizado correctamente',
        'product' => $product,
        'status' => 200,
    ], 200);
}


    public function updateParcial($id){
        $product=Product::find($id);
        if(!$product){
            $data=[
                'mensaje'=>'Producto no encontrado',
               'status'=>404
            ];
            return response()->json($data,404);
        }
        return response()->json($data,404);
        $validator=Validator::make($request->all(),[
            'nombre'=>'max:255',
            'descripcion'=>'max:255',
            'precio'=>'numeric',
            'cantidad'=>'numeric',
            'image'=>'image|mimes:jpeg,png,jpg|max:2048'
        ]);
        if($validator->fails()){
            $data=[
               'mensaje'=>'Error en la validación de los datos',
               'errors'=>$validator->errors(),
               'status'=>400
            ];
            return response()->json($data,400);
        }
        if($request->has('nombre')){
            $product->nombre=$request->nombre;
        }
        if($request->has('descripcion')){
            $product->descripcion=$request->descripcion;
        }
        if($request->has('precio')){
            $product->precio=$request->precio;
        }
        if($request->has('cantidad')){
            $product->cantidad=$request->cantidad;
        }
        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior si existe
            if ($product->image) {
                \Storage::disk('public')->delete($product->image);
            }
    
            // Guardar la nueva imagen
            $product->image = $request->file('image')->store('products', 'public');
        }
        $product->save();
        $data=[
            'mensaje'=>'Producto actualizado correctamente',
            'product'=>$product,
           'status'=>200
        ];
        return response()->json($data,200);
    
    }

    public function destroy($id){
        $product=Product::find($id);
        if($product){
            $product->delete();
            $data=[
               'mensaje'=>'Producto eliminado correctamente',
               'status'=>200
            ];
            return response()->json($data,200);
        }else{
            $data=[
               'mensaje'=>'Producto no encontrado',
               'status'=>404
            ];
            return response()->json($data,404);
        }
    }

}    