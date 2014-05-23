<?php
//
//$errors         = array();  	// array to hold validation errors
//$data 		= array(); 		// array to pass back data
//
//// validate the variables ======================================================
//	if (empty($_POST['firstName']))
//		$errors['name'] = 'Name is required.';
//
//	if (empty($_POST['superheroAlias']))
//		$errors['superheroAlias'] = 'Superhero alias is required.';
//
//// return a response ===========================================================
//
//	// response if there are errors
//	if ( ! empty($errors)) {
//
//		// if there are items in our errors array, return those errors
//		$data['success'] = false;
//		$data['errors']  = $errors;
//	} else {
//
//		// if there are no errors, return a message
//		$data['success'] = true;
//		$data['message'] = 'Success!';
//	}
//
//	// return all our data to an AJAX call
//	echo json_encode($data);


    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
//        $name = strip_tags(trim($_POST["name"]));
//				$name = str_replace(array("\r","\n"),array(" "," "),$name);
//        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
//        $message = trim($_POST["message"]);
//
//        // Check that data was sent to the mailer.
//        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
//            // Set a 400 (bad request) response code and exit.
//            http_response_code(400);
//            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
//            exit;
//        }

        // Set the recipient email address.
        // Adresse de réception du message
        $recipient = "cedric.steck@gmail.com";
        
        var_dump($_SERVER);

        // Set the email subject.
        $subject = $_POST["object"];
        var_dump($_POST);
        // Build the email content.
        $email_content = "Name: ". $_POST["name"] ."\n";
        $email_content .= "Email: ". $_POST["email"] ."\n\n";
        $email_content .= "Message:\n". $_POST["message"] ."\n";

        // Build the email headers.
        $email_headers = "From: ".$_POST["name"]." <". $_POST["email"] .">";
        $headers = 'From: webadmin-chti@gmail.com' . "\r\n". 
        'Reply-To: ' . $_POST["email"]. "\r\n" . 
        'X-Mailer: PHP/' . phpversion();

        // Send the email.
        //if (mail($recipient, $subject, $email_content, $email_headers)) {
        if (mail($recipient, $email_content, $email_content, $headers)) {
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