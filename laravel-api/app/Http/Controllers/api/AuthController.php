<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //
    public function register(Request $request){
            $user1 = User::where('email',$request->email)->first();
            if($user1){
                return response()->json([
                    'status' => 401,
                    'error' => 'Email is exist'
                ]);
            }
            $user = User::create([
                'name' => $request->input('name'),
                'email'=> $request->input('email'),
                'password'=> Hash::make($request->input('password'))
            ]);

            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'username'=>$user->name,
                'token'=> $token,
                'message' => 'Register successfully !'
            ]);
    }

    public function login(Request $request){
        $user = User::where('email',$request->email)->first();
        if(!$user || ! Hash::check($request->password,$user->password)){
            return response()->json([
                'status' => 401,
                'message' => 'Invaild Credentials'
            ]);
        }else {
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'username'=>$user->name,
                'token'=> $token,
                'message' => 'Logged in successfully !'
            ]);
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out successfully !'
        ]);
    }
    
}
