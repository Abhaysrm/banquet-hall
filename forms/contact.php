<?php

$to = "info@ramabanquets.com";
$email_from =  "info@ramabanquets.com";
$email_subject = "Contact" ;
$email_body = 
'Name: ' .  $_POST['name'] ."\r\n" .'Phone:' . $_POST['phone'] ."\r\n" .'Event-date: ' .  $_POST['event_date'] ."\r\n" .'Event-type: ' .  $_POST['event_type'] ."\r\n" .'Total-guests: ' .  $_POST['guests'] ."\r\n" . 'E-mail:' .$_POST['email'] ."\r\n" . 'Message:' .$_POST['message'];
$headers = 'From: ' . $email_from . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$response = mail($to, $email_subject, $email_body, $headers);

if ($response != 1) {
echo "
<p>Thanks for your enquiry. Our team will get in touch with you shorty for confirmation.</p>
<p>Cheers! </p> 
";
} else {
echo "
<p>Thanks for your enquiry. Our team will get in touch with you shorty for confirmation.</p> 
";
}
?>

