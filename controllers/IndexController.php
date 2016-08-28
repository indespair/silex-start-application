<?php

namespace app\controllers;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class IndexController
{
    public function run(Request $request, Application $app)
    {
        return $app['twig']->render('index.twig');
    }
}