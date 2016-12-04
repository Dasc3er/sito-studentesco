<?php

$app->group('/admin', function () use ($app, $permissions) {
    $app->get('', 'App\Controllers\AdminController:index')->setName('administration');
    $app->get('/', 'App\Controllers\AdminController:index');

    $app->group('/logins', function () use ($app, $permissions) {
        $app->get('', 'App\Controllers\AdminController:logins')->setName('logins');
        $app->get('/reset', 'App\Controllers\AdminController:resetlogins')->setName('reset-logins');
    });

    $app->group('/visits', function () use ($app, $permissions) {
        $app->get('', 'App\Controllers\AdminController:visits')->setName('visits');
        $app->get('/reset', 'App\Controllers\AdminController:resetVisits')->setName('reset-visits');
    });

})->add($permissions['admin']);