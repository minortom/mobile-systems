<?php 

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
spl_autoload_register(function ($classname) {
    require ("classes/" . $classname . ".php");
});

$config['displayErrorDetails'] = true;
$config['db']['host']   = "localhost:8889";
$config['db']['user']   = "root";
$config['db']['pass']   = "root";
$config['db']['dbname'] = "42";


$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$container['view'] = new \Slim\Views\PhpRenderer("templates/");

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    try {
        $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'] . ";charset=utf8",
            $db['user'], $db['pass']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }

    return $pdo;
};



/*******************
****** Tags ******
********************/

// Get tag
$app->get('/tag/{search}', function (Request $request, Response $response, $args) {
    // Check if login is correct first if not return 401

    $tag = new TagEntity($request, $args);
    $tag_mapper = new TagMapper($this->db);
    $queryResponse = $tag_mapper->search($tag);
    $newResponse = $response->withJson($queryResponse);
    return $newResponse;
});

/*******************
****** Users ******
********************/

// Get tag
$app->post('/user/new', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $user = new UserEntity($request);
    $user_mapper = new UserMapper($this->db);
    $queryResponse = $user_mapper->postUser($user);
    if($queryResponse['success']) {
        $newResponse = $response->withJson($queryResponse);
    } else {
        $newResponse = $response->withStatus(401);
        $newResponse = $newResponse->withJson($queryResponse);
    }
    return $newResponse;
});
$app->run();
?>
