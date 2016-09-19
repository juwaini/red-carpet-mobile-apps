<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Customer Login</title>
        <link href="stylesheet.css" rel="stylesheet" type="text/css" />
    </head>

    <body>
        <div class="wrapper">
            <div class="login">
                <form name="loginForm" action="loginCheck.php" method="post">
                    <?php require("protect/serverInfo.php"); ?>
                        Email: <input type="text" name="Email" maxlength="35" /><br />
                        Password: <input type="text" name="Password" maxlength="4" /><br />
                    <input type="submit" name ="submit"/>
                </form>
            </div>
        </div>
    </body>

</html>