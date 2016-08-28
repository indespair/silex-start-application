<?php

$baseDir = __DIR__.'/..';

require_once $baseDir.'/vendor/autoload.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), [
    'twig.path' => $baseDir.'/views'
]);


$app->get('/', 'app\controllers\IndexController::run');

$app->run();
