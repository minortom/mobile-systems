<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
function executeSQL($sql, $internal = false) {
  $servername = "mysql1100int.cp.hostnet.nl";
  $username = "u211413_fourty";
  $password = "fourtytwo";
  $dbname = "db211413_fourtytwo";

  // Create connection
  $con = mysqli_connect($servername, $username, $password, $dbname);
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($result = mysqli_query($con, $sql)) {
    if($result == '1') {
      mysqli_close($con);
      return;
    }

  	// If so, then create a results array and a temporary one
  	// to hold the data
  	$resultArray = array();
  	$tempArray = array();

  	// Loop through each row in the result set
  	while($row = $result->fetch_object())
  	{
  		// Add each row into our results array
  		$tempArray = $row;
        array_push($resultArray, $tempArray);
  	}

  	// Finally, encode the array to JSON and output the results
  	if (!$internal) {
  		echo json_encode($resultArray);
  	}
  	else {
  		return $resultArray;
  	}
  }

  // Close connections
  mysqli_close($con);
}
if(isset($_GET['call']))
    $call = $_GET['call'];
else
    $call = $_POST['call'];

if($call == 'getquestion') {
    $id = $_POST['id'];
    $sql = "SELECT * FROM questions WHERE id = $id";
} elseif($call == 'newquestion') {
    $question = $_POST['question'];
    $tags = $_POST['tags'];
    $sql = "INSERT INTO questions (question, tags) VALUES('$question', '$tags')";
}

executeSQL($sql);
