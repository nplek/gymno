<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Validation\ValidationException;
use App\User; 
use Auth; 
use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;

class LoginController extends Controller
{
    public $successStatus = 200;
    
    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/app/#';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request) {
        $this->validateLogin($request);
    
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return $this->sendLockoutResponse($request);
        }
    
        // This section is the only change
        if ($this->guard()->validate($this->credentials($request))) {
            $user = $this->guard()->getLastAttempted();
    
            // Make sure the user is active
            if ($user->active == 'I'){
                $msg['message'] = 'User inactive';
                $msg['errors'] = '401';
                return response()->json([$msg], 401); 
            }

            if ($user->active == 'A' && $this->attemptLogin($request)) {
                return $this->sendLoginResponse($request);
            } else {
                $this->incrementLoginAttempts($request);
                $msg['message'] = 'Unauthorised';
                $msg['errors'] = '401';
                return response()->json([$msg], 401); 
            }
        }
    
        $this->incrementLoginAttempts($request);
    
        return $this->sendFailedLoginResponse($request);
    }
    
    /*public function login(Request $request) {
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            if($user->active == 'I'){
                return response()->json(['error' => 'User inactive', 'message'=>'User inactive'],401);
            }
            $tokenResult = $user->createToken('gymno-ocho');
            $token = $tokenResult->token;

            if ($request->remember_me)
                $token->expires_at = Carbon::now()->addWeeks(1);
            
            $token->save();
            return response()->json([
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()
                ], $this->successStatus);
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        }
    }*/

    protected function sendLoginResponse(Request $request)
    {
        $user = Auth::user();
        $roles = $user->roles();
        $role['role'] = $roles;
        $request->session()->regenerate();
        
        $tokenResult = $user->createToken('gymno-ocho',['*']);
        $access_token = $tokenResult->accessToken;
        $token = $tokenResult->token;

        //$token->expires_at = Carbon::now()->addWeeks(1);
        $token->expires_at = Carbon::now()->addMinute();
        $token->save();

        $this->clearLoginAttempts($request);

        return response()->json(['message' => 'Login success.', 'data' => ['token' => $access_token, 'payload' => $role], 'token' => $token],200);
    }

    protected function sendFailedUserNotActiveResponse(Request $request)
    {
        throw ValidationException::withMessages([
            $this->username() => ['User not active ,please contact admin.'],
        ]);
    }

    /*public function logout(Request $request) 
    {
        $request->session()->flush();
        Auth::logout();
        return response()->json(['success'=>'Logout'], 200); 
        //return redirect('/login');
    }*/

    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        return $this->loggedOut($request) ?: redirect('/app/#/auth/login');
    }

    public function getRole(Request $request)
    {
        $user = Auth::user();
        return new UserResource($user);
    }
}
