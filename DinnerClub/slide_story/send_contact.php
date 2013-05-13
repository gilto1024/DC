<?php
header('Content-Type: text/html');
require_once ("PHPMailer/class.phpmailer.php");
// Contact subject
$name = $_POST['name'];
$customerMail = $_POST['customerMail'];
$message = $_POST['message'];

//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

$mailer = new PHPMailer(); // the true param means it will throw exceptions on errors, which we need to catch

$mailer->IsSMTP(); // telling the class to use SMTP

 			$mailer->SMTPAuth = true;

 			$mailer->SMTPSecure = "tls";
 			$mailer->Host = "smtp.gmail.com";
 			$mailer->Port = 587;
 			$mailer->Username = "gilto1024@gmail.com";
 			$mailer->Password = "naamalevi20";
 			$mailer->SetFrom($customerMail,'Customer Email');
 			$mailer->FromName = $name;
 			$mailer->AddAddress('gilto1024@gmail.com');
 			$mailer->Subject = "DC contact Form";
 			$mailer->Body = $message;
 			$mailer->IsHTML (false);
 			if (!$mailer->Send())
 			{
 				throw new Exception("Send Mail Error: $mailer->ErrorInfo");
 			}
 			else
 			{
 				echo "yes";
 			}

	?>
