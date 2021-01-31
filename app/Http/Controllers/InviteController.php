<?php

namespace App\Http\Controllers;

use App\Enums\InviteStatus;
use App\Enums\Roles;
use App\Models\Group;
use App\Models\Invite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class InviteController extends Controller
{
    public function inviteUser(Request $request, Group $group)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'Missing email!',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        /** @var User $invitedUser */
        $invitedUser = User::query()->where('email', '=', $request->get('email'))->first();

        if ($invitedUser->isPartOfGroup($group->id)) {
            return response([
                'message' => 'Already part of group!',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        if (empty($invitedUser)) {
            return response([
                'message' => 'Email not found :/',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        Invite::create([
            'status' => 'pending',
            'user_id' => $invitedUser->id,
            'group_id' => $group->id
        ]);

        return response([
            'message' => 'Invite sent!',
            'data' => []
        ], Response::HTTP_OK);
    }

    public function patchInvite(Request $request, Invite $invite)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'Missing status!',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = $request->user();

        if ($user->id !== $invite->user->id) {
            return response([
                'message' => 'Cannot edit this invite',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        switch ($request->get('status')) {
            case InviteStatus::APPROVED()->getValue():
                $invite->status = $request->get('status');
                $role = Role::query()->where('name', '=', Roles::BASIC())->first();
                $user->groups()->attach($invite->group->id, ['role_id' => $role->id]);
                $invite->save();
                break;
            case InviteStatus::REJECTED()->getValue():
                try {
                    $invite->delete();
                } catch (\Exception $e) {
                    return response([
                        'error' => $e->getMessage(),
                        'errorCode' => $e->getCode()
                    ], Response::HTTP_BAD_REQUEST);
                }
                break;
            default:
                return response([
                    'message' => 'Missing status!',
                    'data' => []
                ], Response::HTTP_BAD_REQUEST);
        }

        return response([
            'message' => 'Invite patched with success!',
            'data' => []
        ], Response::HTTP_OK);
    }
}
