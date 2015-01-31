<?php

# This is the default homepage for new users' webspace.
# You can delete it or change it to whatever you like.


$subdomains = Explode(".", $_SERVER["SERVER_NAME"]);
$username = $subdomains[0];


?>
<html>
	<head>
		<title>Emma '<?=$username?>' Carrigan</title>
		<link rel="stylesheet" type="text/css" href="../../main.css">
		<script type="text/javascript" src="js/webgl-utils.js"></script>
		<script type="text/javascript" src="js/WEDIDITBOYS.php"></script>
		<script type="text/javascript" src="js/websockets.js"></script>
		<script type="text/javascript" src="js/obj_parser.js"></script>
		<script type="text/javascript" src="js/maths_funcs.js"></script>
		<script type="text/javascript" src="js/camera.js"></script>
		<script type="text/javascript" src="js/input.js"></script>
		<script type="text/javascript" src="js/image.js"></script>
	</head>
	<body onload="main();">
		<h1>GRFX</h1>
		<br>
		<center>
			<table style="text-align: center">
			<tr height="700px">
			<td>
			<div id="WebGL" style="height: 100%">
				<h2>Uh WASD IJKL</h2>
				<canvas id="canvas01" style="border: none;" width="500" height="500"></canvas>
			</div>
			</td>
			<td>
			<div id="Websockets" style="height: 100%">
				<h2>Uh I need to learn how to Apache</h2>
				<br>
				<div id="messages" style="height: 500px; width: 500px; overflow: auto">
					<div id="output"></div>
				</div>
				<br>
				<form name="message_form" action="javascript:SendMessage()" method="post">
					<textarea name="message_to_send" cols="50"></textarea>
					<br>
					<input type="submit">
				</form>
			</div>
			</td>
			</tr>
			</table>
		</center>
		<br>
		<div class="links">
			<a href="../../index.php">HOME</a>
		</div>
	</body>
</html>