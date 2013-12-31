<?php
	header('Content-Type: text/json; charset=UTF-8');
	if (isset($_GET['url'])) $url = $_GET['url'];

	//$xml_obj = simplexml_load_file('http://www.clickatable.co.il/clickatable/WebServices/PartnersService.asmx/GetRestaurantSearchUrl?'.urldecode($url));	//get the feed from the url
	$xml_obj = simplexml_load_file('http://www.clickatable.co.il/clickatable/WebServices/PartnersService.asmx/GetRestaurantSearchUrl?name=&city=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&addr=%D7%9E%D7%92%D7%93%D7%9C%D7%99%20%D7%A2%D7%96%D7%A8%D7%99%D7%90%D7%9C%20%D7%A7%D7%95%D7%9E%D7%94%2049&id=1&siteName=test&phone=035525047');

	echo urldecode(json_encode($xml_obj));
	//echo 'http://www.clickatable.co.il/clickatable/WebServices/PartnersService.asmx/GetRestaurantSearchUrl?'.(urldecode($url));
?>


