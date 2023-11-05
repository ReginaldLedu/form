<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);


#$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->Host = 'smtp.prazdnikvsemdetyam.ru'; //Set the SMTP server to send through // from readme
$mail->SMTPAuth = true; // from readme
$mail->Username = 'zakaz@prazdnikvsemdetyam.ru'; //SMTP username // from readme
$mail->Password = 'secret'; //SMTP password // from readme
$mail->Port = 587; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`



$mail->setFrom('zakaz@prazdnikvsemdetyam.ru');
$mail->addAddress('saparova.regina@yandex.ru');
$mail->Subject = 'Заявка с сайта';

$body = '<h1>Встречайте, наконец-то получилось</h1>';
if (trim(!empty($_POST['date']))) {
	$body .= '<p><strong>Дата:</strong> ' . $_POST['date'] . '</p>';
}

if (trim(!empty($_POST['hero']))) {
	$body .= '<p><strong>Персонаж:</strong> ' . $_POST['hero'] . '</p>';
}

if (trim(!empty($_POST['program']))) {
	$body .= '<p><strong>Программа:</strong> ' . $_POST['program'] . '</p>';
}

if (trim(!empty($_POST['kidName']))) {
	$body .= '<p><strong>Имя именинника/цы:</strong> ' . $_POST['kidName'] . '</p>';
}

if (trim(!empty($_POST['kidQuantity']))) {
	$body .= '<p><strong>Кол-во детей и их возраст:</strong> ' . $_POST['kidQuantity'] . '</p>';
}

if (trim(!empty($_POST['phone']))) {
	$body .= '<p><strong>Номер телефона:</strong> ' . $_POST['phone'] . '</p>';
}

if (trim(!empty($_POST['address']))) {
	$body .= '<p><strong>Адрес:</strong> ' . $_POST['address'] . '</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>