<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * redirect to app
     *
     * @param Request $request
     * @return RedirectResponse|Renderable
     */
    public function redirectToApp(Request $request): RedirectResponse
    {
        $groups = $request->user()->groups;

        if ($groups->isEmpty()) {
            return redirect()->action([HomeController::class, 'showApp'], ["groupId" => 0]);
        } else {
            $groupId = $request->user()->groups->first()->pivot->group_id;
            return redirect()->action([HomeController::class, 'showApp'], ["groupId" => $groupId]);
        }
    }

    /**
     * Show the application dashboard.
     *
     * @param Request $request
     * @return Renderable
     */
    public function showApp(Request $request): Renderable
    {
        return view('home', ['token' => $request->user()->api_token]);
    }
}
