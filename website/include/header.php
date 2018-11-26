<?php

	// Assume the user is not logged in and not an admin
	$isadmin = FALSE;
	$loggedin = FALSE;
	
	// If we have a session ID cookie, we might have a session
	if (isset($_COOKIE['sessionid'])) {
		
		$user = $app->getSessionUser($errors); 
		$loggedinuserid = $user["userid"];

		// Check to see if the user really is logged in and really is an admin
		if ($loggedinuserid != NULL) {
			$loggedin = TRUE;
			$isadmin = $app->isAdmin($errors, $loggedinuserid);
		}

	} else {
		
		$loggedinuserid = NULL;

	}


?>
<!--
<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover {
    background-color: #111;
}
</style>
</head>
<body>

<ul>
  <li><a href="index.php">Home</a></li>
  <li><a href="register.php">Register</a></li>
  <li><a href="login.php">Login</a></li>
  <li><a href="editprofile.php">Edit Profile</a></li>
<li><a href="admin.php">Admin</a></li>
    <li><a href="logout.php">Logout</a></li>
</ul>
-->


	<div class="nav">
		<a href="index.php">Home</a>
		&nbsp;&nbsp;
		<?php if (!$loggedin) { ?>
			<a href="login.php" class="navitem">Login</a>
			&nbsp;&nbsp;
			<a href="register.php" class="navitem">Register</a>
			&nbsp;&nbsp;
		<?php } ?>
		<?php if ($loggedin) { ?>
			<a href="list.php">List</a>
			&nbsp;&nbsp;
			<a href="editprofile.php" class="navitem">Profile</a>
			&nbsp;&nbsp;
			<?php if ($isadmin) { ?>
				<a href="admin.php" class="navitem">Admin</a>
				&nbsp;&nbsp;
			<?php } ?>
			<a href="fileviewer.php?file=include/help.txt" class="navitem">Help</a>
			&nbsp;&nbsp;
			<a href="logout.php" class="navitem">Logout</a>
			&nbsp;&nbsp;

		<?php } ?>
	</div>

