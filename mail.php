<?php
$send_to = 'katia_03@list.ru'; // Почта получателя
$array = [
	'name'   => 'Имя клиента',
	'phone'  => 'Телефон клиента',
	'spruce' => 'Выбранная ель'
];
$mail = [
	'name'   => null,
	'phone'  => null,
	'spruce' => null
];
// Проверка на существование поля и его обработка
foreach ($mail as $key => $value) {
	$mail[$key] = isset($_POST[$key]) ? check_input($_POST[$key]) : 'Не указано';
}
$message = '';
// Формирование списка
foreach ($mail as $key => $value) {
	if (isset($array[$key])){
		$message .= '<li>' . $array[$key] . ': ' . $value . '</li>';
	}
}
$headers = "From: Аренда ёлок <elki@xn--80aaldc4agmnn.xn--p1ai>" . "\r\n"; // Отправитель (Домен арендаелок.рф в кодировке Punycode)
$headers .= "Content-type: text/html; charset=\"utf-8\"";
mail($send_to, 'Заказ звонка', '<html><head></head><body><ul>' . $message . '</ul></body></html>', $headers);

function check_input($data){
	$data = trim($data);
	$data = stripcslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}