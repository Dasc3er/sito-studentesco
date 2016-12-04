<?php

$app->group('/courses', function () use ($app, $permissions) {
    $app->get('', 'App\Controllers\CourseController:index')->setName('courses');

    $app->get('/{id:[0-9]}', 'App\Controllers\CourseController:datail')->setName('course');

    $app->group('', function () use ($app, $permissions) {
        $app->get('/new', 'App\Controllers\CourseController:form')->setName('new-course');
        $app->post('/new', 'App\Controllers\CourseController:formPost');

        $app->get('/edit/{id:[0-9]}', 'App\Controllers\CourseController:form')->setName('edit-course');
        $app->post('/edit/{id:[0-9]}', 'App\Controllers\CourseController:formPost');

        $app->get('/delete/{id:[0-9]}', 'App\Controllers\CourseController:delete')->setName('delete-course');
        $app->post('/delete/{id:[0-9]}', 'App\Controllers\CourseController:deletePost');
    })->add($permissions['admin']);
});