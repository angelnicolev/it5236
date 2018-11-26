<?php

// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();

// Get the name of the file to display the contents of
$name = $_GET["file"];

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>russellthackston.me</title>
	<meta name="description" content="Russell Thackston's personal website for IT 5233">
	<meta name="author" content="Russell Thackston">
	<link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/style2.css">
    <link href="https://fonts.googleapis.com/css?family=Niramit" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<!--1. Display Errors if any exists 
	2. If no errors display things -->
<body>
	<?php include 'include/header.php'; ?>
	<h2>User Guide</h2>
	<div>
		<?php echo $app->getFile($name); ?>
	</div>
	
</body>
</html>
