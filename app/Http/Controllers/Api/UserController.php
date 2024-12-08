<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
    
        // Modificar la respuesta para incluir la contraseña
        $users = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'email' => $user->email,
                'password' => $user->password,  // Mostrar la contraseña sin cifrar
                'name' => $user->name,
                'role' => $user->role,
                'avatar' => $user->avatar,
                'creationAt' => $user->created_at->toIso8601String(),
                'updatedAt' => $user->updated_at->toIso8601String(),
            ];
        });
    
        return response()->json($users, 200);
    }
    

public function show($id)
{
    $user = User::find($id);
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Modificar la respuesta para incluir la contraseña
    $userResponse = [
        'id' => $user->id,
        'email' => $user->email,
        'password' => $user->password,  // Mostrar la contraseña sin cifrar
        'name' => $user->name,
        'role' => $user->role,
        'avatar' => $user->avatar,
        'creationAt' => $user->created_at->toIso8601String(),
        'updatedAt' => $user->updated_at->toIso8601String(),
    ];

    return response()->json($userResponse, 200);
}

public function store(Request $request)
{
    // Validación de los datos
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:8',  // No encriptamos la contraseña
        'role' => 'required|string',
        'avatar' => 'nullable|image|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // No ciframos la contraseña, se guarda tal cual
    $data = $request->all();

    // Crear el usuario sin cifrar la contraseña
    $user = User::create($data);

    // Retornamos el usuario con la contraseña sin encriptar
    return response()->json($user, 201);
}


public function update(Request $request, $id)
{
    $user = User::find($id);
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Validación de los datos
    $validator = Validator::make($request->all(), [
        'name' => 'string|max:255',
        'email' => 'email|unique:users,email,' . $id,
        'password' => 'nullable|string|min:8',  // No encriptamos la contraseña
        'role' => 'string',
        'avatar' => 'nullable|image|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Datos a actualizar
    $data = $request->all();

    // Si se proporciona una nueva contraseña, no se cifra
    if (isset($data['password'])) {
        // Aquí no ciframos la contraseña, la dejamos tal cual
        $user->password = $data['password'];
    }

    // Actualizamos el usuario
    $user->update($data);

    return response()->json($user, 200);
}




    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return response()->noContent();
    }
}
