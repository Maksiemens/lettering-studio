<?php
$tel = $_POST['popup-form-tel'];
$message = '
<html>
	<head>
		<title>Заявка с сайта ilyazov.ru</title>
	</head>
	<body>
		<p>
			<span style="font-weight: 400;">Заявка с сайта ilyazov.ru</span>
		</p>
		<p>
			<span style="font-weight: 400;">Посетитель заказал обратный звонок!</span>
		</p>
		<p>
			<span style="font-weight: 700;">Телефон:</span> '.$tel.'
		</p>
	</body>
</html>';
$message = iconv("UTF-8", "windows-1251", $message);
$to = "makskondratenko@ukr.net";
$headers[] = "To: Никита Ильязов <designer@nikitaspace.ru>";
$headers[] = "From: ilyazov.ru<info@ilyazov.ru>";
$headers[] = "Bcc: makskondratenko@ukr.net";
$headers[] = "Content-type: text/html";
$subject = "Заявка с сайта ilyazov.ru";
$subject = "=?utf-8?B?".base64_encode($subject)."?=";
mail($to, $subject, $message, implode("\r\n", $headers));
print_r('Отправлено на почту успешно');
?>
