<?php
header("Content-Type: charset=utf-8");
include_once '../PHP/temoignage-class.php';
include_once '../PHP/client-class.php';

$request_var = json_decode($HTTP_RAW_POST_DATA);
if(isset($request_var->action)){
    if(isset($request_var->data)){
        $data = $request_var->data;
    }
    
    switch($request_var->action) {
        // TEMOIGNAGES //
        case "getAllTemoignages":
            $DBtemoignage = new itg_temoignage();
            $result = $DBtemoignage->get_allTemoignages();;
            break;
         case "addNewTemoignage":
            $DBtemoignage = new itg_temoignage();
            $result = $DBtemoignage->add_Temoignage($data->nom, $data->prenom, $data->message);
            break;
        
        // CLIENTS //
        case "getAllClients":
            $DBClient = new itg_client();
            $result = $DBClient->get_allClients();
            break;
        case "addNewClient":
            $DBClient = new itg_client();
            $result = $DBClient->add_Client($data->nom, $data->prenom, $data->telephone, $data->adresse, $data->ville, $data->cp);                   
            break;
        case "dellClient":
            $DBClient = new itg_client();
            $result = $DBClient->del_Client($data->id);                   
            break;
        
        // BAD ACTION //
        default:
            header('HTTP/1.1 500 Internal Server');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array('message' => 'ERROR : bad request', 'code' => 1337)));
            
    }
    
    // SORTIE
    print result($result);
    
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

