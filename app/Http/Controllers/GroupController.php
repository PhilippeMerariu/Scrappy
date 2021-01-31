<?php

namespace App\Http\Controllers;

use App\Enums\Roles;
use App\Models\Content;
use App\Models\Group;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class GroupController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'Missing fields!',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        $imagePath = null;

        if ($request->file('image_group')) {
            $imagePath = Storage::putFile('group_profile', $request->file('image_group'));
        }

        /** @var User $user */
        $user = $request->user();

        $role = Role::query()->where('name', '=', Roles::ADMIN())->first();

        $group = Group::create([
            'name' => $request->name,
            'image_path' => $imagePath
        ]);

        $user->groups()->attach($group->id, ['role_id' => $role->id]);

        return response([
            'message' => 'Succesfully created group!',
            'data' => [
                'group' => $group
            ]
        ], Response::HTTP_OK);
    }

    public function showProfilePicture(Request $request, $path)
    {
        $groups = $request->user()->groups;
        $canSeePicture = false;

        foreach ($groups as $group) {
            if (
                !is_null($group->profile_picture)
                && str_contains($group->profile_picture['url'], $path)
            ) {
                $canSeePicture = true;
            }
        }

        if (!$canSeePicture) {
            return response([
                'message' => "Can't see picture!",
            ], Response::HTTP_BAD_REQUEST);
        }

        $fullPath = Storage::path('/group_profile/' . $path);

        return response()->file($fullPath);
    }

    public function getGroupContents(Request $request, Group $group)
    {
        try {
            /** @var User $user */
            $user = $request->user();

            if (!$user->isPartOfGroup($group->id)) {
                return response([
                    'message' => 'Not part of the group!',
                    'data' => []
                ], Response::HTTP_BAD_REQUEST);
            }

            $contents = Content::query()->where('group_id', '=', $group->id)->get();

            return response([
                'message' => 'Successfully retrieved content!',
                'data' => [
                    'contents' => $contents
                ]
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
                'data' => []
            ], $e->getCode());
        }
    }

    public function getGroupUsers(Request $request, Group $group)
    {
        return response([
            "message" => "Successfully retrieved user groups!",
            "data" => [
                "groups" => $group->users
            ]
        ], Response::HTTP_OK);
    }

    public function leaveGroup(Request $request, Group $group)
    {
        $request->user()->groups()->detach($group->id);

        return response([
            "message" => "yo you quit the group!",
            "data" => []
        ], Response::HTTP_OK);
    }
}
