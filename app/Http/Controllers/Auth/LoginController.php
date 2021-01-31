<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Exception;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/login');
    }

    /**
     * The user has been authenticated.
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     */
    protected function authenticated(Request $request, User $user)
    {
        $user->generateApiToken();
    }

    /**
     * Login request and send back API token
     * @param Request $request
     * @return mixed
     */
    public function apiLogin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response([
                    'message' => 'Missing fields!',
                    'data' => []
                ], Response::HTTP_BAD_REQUEST);
            }

            /** @var User $user */
            $user = User::where('email', trim($request->email))->first();

            $auth = $this->attemptLogin($request);

            if (!$user || !$auth) {
                return response([
                    'message' => 'Invalid credentials!',
                    'data' => []
                ], Response::HTTP_BAD_REQUEST);
            }

            $user->generateApiToken();

            return response([
                'message' => 'Success!',
                'data' => [
                    'user' => $user
                ]
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
                'data' => []
            ], $e->getCode());
        }
    }
}
