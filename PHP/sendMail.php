<?php

 $receiver = "cedric.steck@gmail.com";
 $subject = "The subject";
 $message .= 'Hello';
 $header = "MIME-Version: 1.0" . "\r\n";
 $header .= "Content-type:text/html;charset=utf-8" . "\r\n";
 $header .= "From: " .$_POST['from'] . "\r\n";

 if(mail($receiver, $subject, $message, $header)){
     echo "SUCCESS";
 }
 
?>
