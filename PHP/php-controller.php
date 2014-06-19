<?php
header("Content-Type: charset=utf-8");
include_once '../PHP/temoignage-class.php';

$request_var = json_decode($HTTP_RAW_POST_DATA);
if(isset($request_var->action)){
    if($request_var->action == "getAllTemoignages"){
        $DBtemoignage = new itg_temoignage();
        $temoignages = $DBtemoignage->get_allTemoignages();
        print result($temoignages);
    } elseif ($request_var->action == "addTemoignage") {
        $DBtemoignage = new itg_temoignage();
        $temoignages = $DBtemoignage->add_Temoignage($nom, $prenom, $message);
        print result($temoignages);
    }  else{
        header('HTTP/1.1 500 Internal Server');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('message' => 'ERROR : bad request', 'code' => 1337)));
    }
}else{
    http_response_code(400);
}

function result($data){
    utf8_encode_deep($data);
    $return = new stdClass();
    $return->status = "ok";
    $return->data = $data;
    return json_encode($return);
}

function utf8_encode_deep(&$input) {
	if (is_string($input)) {
		$input = utf8_encode($input);
	} else if (is_array($input)) {
		foreach ($input as &$value) {
			utf8_encode_deep($value);
		}
		
		unset($value);
	} else if (is_object($input)) {
		$vars = array_keys(get_object_vars($input));
		
		foreach ($vars as $var) {
			utf8_encode_deep($input->$var);
		}
	}
}

