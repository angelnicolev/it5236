<?php
	
// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();

// Declare an empty array of error messages
$errors = array();

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Lyric!</title>
	<meta name="description" content="Russell Thackston's personal website for IT 5236">
	<meta name="author" content="Russell Thackston">
	<link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/style2.css">
    <link href="https://fonts.googleapis.com/css?family=Niramit" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<?php include 'include/header.php'; ?>
   <div class=container4>
        <img src="https://lyricbham.com/wp-content/uploads/2015/09/lyric-theatre-logo.png" id="logo">
        <p style="text-align: center" id="slogan">
            Your go-to place for sharing lyrics of your favorite songs! 
        </p> <img src="https://us.123rf.com/450wm/alterphoto/alterphoto1608/alterphoto160800085/62220773-happy-relaxed-girl-listening-music-using-headphones-and-smartphone-lying-on-bed-at-home-people-leisu.jpg?ver=6" class="center"></br>
            <div id="buttons">
                  
                <button class="button button1"><a href="register.php">create an account!</a></button>
                <button class="button button1"><a href="login.php">login!</a></button>
            </div>
    </div>
	<?php include 'include/footer.php'; ?>
	<script src="js/site.js"></script>
</body>
</html>
