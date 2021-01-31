<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Group;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function storeContent(Request $request, Group $group)
    {
        /** @var User $user */
        $user = $request->user();

        if (!$user->isPartOfGroup($group->id)) {
            return response([
                'message' => 'Not part of the group!',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!$request->file('file')) {
            return response([
                'message' => 'Missing file!',
                'data' => []
            ], Response::HTTP_BAD_REQUEST);
        }

        $path = Storage::putFile('group_contents/' . $group->id, $request->file('file'));

        $content = Content::create([
            'path' => $path,
            'group_id' => $group->id,
            'user_id' => $user->id,
            'caption' => $request->caption
        ]);

        return response([
            'message' => 'Success!',
            'data' => [
                'content' => $content
            ]
        ], Response::HTTP_OK);
    }

    public function showContent(Request $request, Group $group, $path)
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

            $fullPath = Storage::path('/group_contents/' . $group->id . '/' . $path);

            return response()->file($fullPath);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
                'data' => []
            ], $e->getCode());
        }
    }
}
