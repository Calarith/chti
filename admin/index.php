<?php
header('Content-Type: text/html; charset=utf-8');
include_once '../PHP/admin-class.php';
$admin = new itg_admin();
$admin->_authenticate();
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="fr" ng-app="myAdminApp"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="">
        <title>Administration</title>
        <meta name="viewport" content="width=device-width">
        <script>
            document.write('<base href="' + document.location + '" />');
        </script>

        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/bootstrap-theme-curstom.css">
        <style>
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>
                
        <link rel="stylesheet" href="../css/main.css">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script src="../js/vendor/angular/angular.min.js"></script>
        <script src="../js/vendor/angular/angular-resource.js"></script>
        <script src="../js/vendor/angular/angular-route.min.js"></script>
        <script src="../js/vendor/angular/angular-animate.min.js"></script>
        <script src="../js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body ng-controller="AdminMainCtrl">
        <div class="container">
            <div class="col-md-4">
                <img src="../images/chti_logo_3.png" class="img-responsive"/>
            </div>   
            <div class="pull-right">   
                <fieldset>
                    <legend>Bienvenue <?php echo $admin->get_nicename(); ?></legend>
                        <p>
                            Connecté en tant que :
                        </p>
                        <p>
                            login: <?php echo $_SESSION['admin_login']; ?>
                        </p>
                        <p>
                            Email: <?php echo $admin->get_email(); ?>
                        </p>
                </fieldset>
                <p>
                    <input type="button" onclick="javascript:window.location.href='logout.php'" value="dé-connection" />
                </p>
            </div>
        </div>
        <div class="navbar navbar-inverse navbar-top" ng-controller="AdminHeaderCtrl" style="margin-bottom: 0px; ">
            <div class="container chti-nav-spacing">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">{{BASE_CONSTS.SITE_NAME}}</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li ng-repeat="nav in navsites"> <a ng-href="{{nav.url}}"><span class="glyphicon glyphicon-{{nav.icon}}"> </span> {{nav.name}}</a></li>
<!--                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li class="divider"></li>
                                <li class="dropdown-header">Nav header</li>
                                <li><a href="#">Separated link</a></li>
                                <li><a href="#">One more separated link</a></li>
                            </ul>
                        </li>-->
                    </ul>
<!--                    <form class="navbar-form navbar-right">
                        <div class="form-group">
                            <input type="text" placeholder="Email" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Password" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-success">Sign in</button>
                    </form>-->
                </div><!--/.navbar-collapse -->
            </div>
        </div>     
        <div ng-view></div>
            
        <div class="container">
            <footer>
                <p>&copy; Pierre Péchaud-Rivière</p>
            </footer>
        </div>
        
       
        <script>window.jQuery || document.write('<script src="../js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

        <script src="../js/vendor/bootstrap.min.js"></script>

        <script src="../js/plugins.js"></script>
        <script src="../js/helper.js"></script>
        <script src="js/admin_main.js"></script>
        <script src="../js/vendor/ui-bootstrap-tpls-0.11.0.min.js"></script>
        <?php
        
        ?>
    </body>
</html>