<?php
header('Content-Type: text/html');
require_once ("PHPMailer/class.phpmailer.php");
// Contact subject
$name = $_POST['name'];
$customerMail = $_POST['customerMail'];
$message = $_POST['message'];

$mailer = new PHPMailer(); // the true param means it will throw exceptions on errors, which we need to catch
$mailer->IsSMTP(); // telling the class to use SMTP
$mailer->SetLanguage( 'en', 'PHPMailer/language/' );
$mailer->SMTPAuth = true;
$mailer->Host = "mail.dinnerclub.co.il";
$mailer->Username = "info@dinnerclub.co.il";
$mailer->Password = "qazxsw3edc";
$mailer->SetFrom('info@dinnerclub.co.il','Customer Email');
$mailer->FromName = $customerMail;
$mailer->AddAddress('info@dinnerclub.co.il');
$mailer->Subject = "DC contact Form";
$mailer->Body = $message . ' --- ' . $customerMail;
$mailer->IsHTML (false);
if (!$mailer->Send())
{
    echo "Send Mail Error: $mailer->ErrorInfo";
}
else
{
    echo "msg sent";
}

	?>
