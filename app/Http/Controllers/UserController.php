<?php

namespace App\Http\Controllers;

use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function getUserGroups(Request $request)
    {
        return response([
            "message" => "Successfully retrieved user groups!",
            "data" => [
                "groups" => $request->user()->groups
            ]
        ], Response::HTTP_OK);
    }

    public function getUserInvites(Request $request)
    {
        $invites = Invite::query()
            ->with('group')
            ->where('status', '=', 'pending')
            ->where('user_id', '=', $request->user()->id)
            ->get();

        return response([
            "message" => "Successfully retrieved user invites!",
            "data" => [
                "invites" => $invites
            ]
        ], Response::HTTP_OK);
    }
}
