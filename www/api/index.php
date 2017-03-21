<?php 
if (isset($_SERVER['HTTP_ORIGIN'])) {
    //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
}   
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
} 
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

// Post new user
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
// Post user tags
$app->post('/user/tags', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $user = new UserEntity($request);
    $user_mapper = new UserMapper($this->db);
    $queryResponse = $user_mapper->postUserTags($user);
    if($queryResponse['success']) {
        $newResponse = $response->withJson($queryResponse);
    } else {
        $newResponse = $response->withStatus(401);
        $newResponse = $newResponse->withJson($queryResponse);
    }
    return $newResponse;
});
// Get user tags
$app->post('/user/tags/get', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $user = new UserEntity($request);
    $user_mapper = new UserMapper($this->db);
    $queryResponse = $user_mapper->getUserTags($user);
    $newResponse = $response->withJson($queryResponse);
    return $newResponse;
});

/*******************
****** Ask ******
********************/

// Post question
$app->post('/ask/new', function (Request $request, Response $response){
    // Check if login is correct first if not return 401
    $ask = new AskEntity($request);
    $ask_mapper = new AskMapper($this->db);
    $queryResponse = $ask_mapper->postAsk($ask);
    if($queryResponse['success']) {
        $newResponse = $response->withJson($queryResponse);
    } else {
        $newResponse = $response->withStatus(401);
        $newResponse = $newResponse->withJson($queryResponse);
    }
    return $newResponse;
});
// Post question tags
$app->post('/ask/tags', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $ask = new AskEntity($request);
    $ask_mapper = new AskMapper($this->db);
    $queryResponse = $ask_mapper->postAskTags($ask);
    if($queryResponse['success']) {
        $newResponse = $response->withJson($queryResponse);
    } else {
        $newResponse = $response->withStatus(401);
        $newResponse = $newResponse->withJson($queryResponse);
    }
    return $newResponse;
});
// Post question tags
$app->post('/user/ask', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $ask = new AskEntity($request);
    $ask_mapper = new AskMapper($this->db);
    $queryResponse = $ask_mapper->getUserAsk($ask);
    $newResponse = $response->withJson($queryResponse);
    return $newResponse;
});

$app->post('/user/answer', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $answer = new AnswerEntity($request);
    $answer_mapper = new AnswerMapper($this->db);
    $queryResponse = $answer_mapper->getUserAnswer($answer);
    $newResponse = $response->withJson($queryResponse);
    return $newResponse;
});

$app->post('/user/answer/accept', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $answer = new AnswerEntity($request);
    $answer_mapper = new AnswerMapper($this->db);
    $queryResponse = $answer_mapper->postAcceptAnswer($answer);
    $newResponse = $response->withJson($queryResponse);
    return $newResponse;
});

$app->post('/user/answer/new', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $answer = new AnswerEntity($request);
    $answer_mapper = new AnswerMapper($this->db);
    $queryResponse = $answer_mapper->postUserAnswer($answer);
    $newResponse = $response->withJson($queryResponse);
    return $newResponse;
});


// Post question tags
$app->post('/ask/match', function (Request $request, Response $response){
    // Check if login is correct first if not return 401

    $ask = new AskEntity($request);
    $ask_mapper = new AskMapper($this->db);
    $queryResponse = $ask_mapper->findBestMatch($ask);
    $newResponse = $response->withJson($queryResponse);
    return $newResponse;
});
$app->run();

?>
