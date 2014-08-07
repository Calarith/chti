<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Set the recipient email address.
        // Adresse (client) de réception du message
        $recipient = "contact@chti-transport.fr";
        // Set the email subject.
        $subject = "[Chti-Transport] ". $_POST["object"];
        // Build the email content.
        $email_content = "Name: ". $_POST["name"] ."\n";
        $email_content .= "Email: ". $_POST["email"] ."\n\n";
        $email_content .= "Message:\n". $_POST["message"] ."\n";

        // Build the email headers.
        $email_headers = "From: ".$_POST["name"]." <". $_POST["email"] .">";
        $headers = 'From: Formulaire de Contact <webadmin-chti@gmail.com>' . "\r\n". 
        'Reply-To: ' . $_POST["email"]. "\r\n" . 
        'X-Mailer: PHP/' . phpversion();

        // Send the email.
        //if (mail($recipient, $subject, $email_content, $email_headers)) {
        if (mail($recipient, $subject, $email_content, $headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Merci! Votre message vient d'être envoyé.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Une erreur est intervenue, votre message n'a pu être envoyé.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>