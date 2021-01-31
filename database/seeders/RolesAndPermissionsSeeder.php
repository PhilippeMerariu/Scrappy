<?php

namespace Database\Seeders;

use App\Enums\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enums\Permissions as EnumPermissions;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $this->seedPermissions();

        $this->seedAdminPermissions();
        $this->seedBasicPermissions();
    }

    public function seedPermissions()
    {
        collect(EnumPermissions::getAllPermissions())->each(function (EnumPermissions $userPermission) {
            Permission::create(['name' => $userPermission, 'guard_name' => 'web']);
        });
    }

    public function seedAdminPermissions()
    {
        Role::create(['name' => Roles::ADMIN()])
            ->givePermissionTo(EnumPermissions::getAdminPermissions());
    }

    public function seedBasicPermissions()
    {
        Role::create(['name' => Roles::BASIC()])
            ->givePermissionTo(EnumPermissions::getBasicPermissions());
    }
}
