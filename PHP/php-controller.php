<?php

//header("Content-Type: charset=utf-8");
include_once '../PHP/temoignage-class.php';
include_once '../PHP/client-class.php';
include_once '../PHP/common-class.php';
include_once '../PHP/config.php';

$FILE_REP = $_SERVER["DOCUMENT_ROOT"]."/files/";
error_reporting(E_ERROR | E_PARSE);

$request_var = new stdClass();

if(isset($_POST["action"])){
    $request_var->action = $_POST['action'];
    $request_var->data = json_decode($_POST['data']);
}

if (isset($_FILES["file"])) {
    //registrerToBlob
    $test = file_get_contents($_FILES["file"]["tmp_name"]);
    $fp = fopen($_FILES["file"]["tmp_name"], 'rb');
    $content = fread($fp, filesize($_FILES["file"]["tmp_name"]));
    $content = addslashes($content);
    $request_var->data->data_mimetype = $_FILES["file"]["type"];
    $request_var->data->data = $content;
    //registrerToFile
//    $request_var = new stdClass();
//    $request_var->action = $_POST['action'];
//    $request_var->data = json_decode($_POST['data']);
//    
//    
//    
//    $request_var->data->data_mimetype = $_FILES["file"]["type"];
//    $request_var->data->data = $content;
    
} else if (isset($HTTP_RAW_POST_DATA)) {
    $request_var = json_decode($HTTP_RAW_POST_DATA);
}


if (isset($request_var->action)) {
    if (isset($request_var->data)) {
        $data = $request_var->data;
    }

    switch ($request_var->action) {
        // TEMOIGNAGES //
        case "getAllTemoignages":
            $DBCommon = new itg_common('temoignage');
            $result = $DBCommon->get_allTemoignages();
            break;
        case "getAllValideTemoignages":
            $DBtemoignage = new itg_temoignage();
            $result = $DBtemoignage->get_allValideTemoignages();
            break;
        case "addNewTemoignage":
            $DBtemoignage = new itg_temoignage();
            $result = $DBtemoignage->add_Temoignage($data->nom, $data->prenom, $data->message);
            break;
        case "dellTemoignage":
            $DBCommon = new itg_common('temoignage');
            $result = $DBCommon->del_Entity($data);
            break;

        // CLIENTS //
        case "getAllClients":
            $DBCommon = new itg_common('client');
            $result = $DBCommon->get_allEntities();
            break;
        case "addNewClient":
            $DBCommon = new itg_common('client');
            $result = $DBCommon->add_Entity($data);
            break;
        case "dellClient":
            $DBCommon = new itg_common('client');
            $result = $DBCommon->del_Entity($data);
            break;
        case "updateClient":
            $DBCommon = new itg_common('client');
            $result = $DBCommon->chg_Entity($data);
            break;

        // CIRCUIT //
        case "getAllCircuits":
            $DBCommon = new itg_common('circuit');
            $result = $DBCommon->get_allEntities();
            break;
        case "addNewCircuit":
            $DBCommon = new itg_common('circuit');
            $result = $DBCommon->add_Entity($data);
            break;
        case "dellCircuit":
            $DBCommon = new itg_common('circuit');
            $result = $DBCommon->del_Entity($data);
            break;
        case "updateCircuit":
            $DBCommon = new itg_common('circuit');
            $result = $DBCommon->chg_Entity($data);
            break;
        case "downloadFileCircuit":
            $DBCommon = new itg_common('circuit');
            $result = $DBCommon->download_DataFile($data);
            break;
        case "downloadCircuit":
            $DBCommon = new itg_common('circuit');
            $result = $DBCommon->download_DataEntity($data);

        // PLANNING //
        case "getAllPlannings":
            $DBCommon = new itg_common('planning');
            $result = $DBCommon->get_allEntities();
            break;
        case "addNewPlanning":
            $DBCommon = new itg_common('planning');
            $result = $DBCommon->add_Entity($data);
            break;
        case "dellPlanning":
            $DBCommon = new itg_common('planning');
            $result = $DBCommon->del_Entity($data);
            break;
        case "updatePlanning":
            $DBCommon = new itg_common('planning');
            $result = $DBCommon->chg_Entity($data);
            break;
        case "downloadFilePlanning":
            $DBCommon = new itg_common('planning');
            $result = $DBCommon->download_DataFile($data);
            break;
        
        // FACTURES //
        case "getAllFactures":
            $DBCommon = new itg_common('facture');
            $result = $DBCommon->get_allEntities();
            break;
        case "addNewFacture":
            $DBCommon = new itg_common('facture');
            $result = $DBCommon->add_Entity($data);
            break;
        case "dellFacture":
            $DBCommon = new itg_common('facture');
            $result = $DBCommon->del_Entity($data);
            break;
        case "updateFacture":
            $DBCommon = new itg_common('facture');
            $result = $DBCommon->chg_Entity($data);
            break;
        case "downloadFileFacture":
            $DBCommon = new itg_common('facture');
            $result = $DBCommon->download_DataFile($data);
            break;
        
        
        // TESTS //
        case "downloadBlob":
            $DBCommon = new itg_common('circuit');
            $result = $DBCommon->download_DataEntity($data);
//            $filename = $result->data_filename;
//            $mimetype = $result->data_mimetype;
//            $filedata = $result->data;      
//            $file_extension = strtolower(substr(strrchr($filename,"."),1));
//            
//            switch( $file_extension )
//            {
//              case "pdf": $ctype="application/pdf"; break;
//              case "exe": $ctype="application/octet-stream"; break;
//              case "zip": $ctype="application/zip"; break;
//              case "doc": $ctype="application/msword"; break;
//              case "xls": $ctype="application/vnd.ms-excel"; break;
//              case "ppt": $ctype="application/vnd.ms-powerpoint"; break;
//              case "gif": $ctype="image/gif"; break;
//              case "png": $ctype="image/png"; break;
//              case "jpeg":
//              case "jpg": $ctype="image/jpg"; break;
//              default: $ctype="application/force-download";
//            }
//            
//            header("Pragma: public"); // required
//            header("Expires: 0");
//            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
//            header("Cache-Control: private",false); // required for certain browsers 
//            header("Content-Type: $ctype");
//            // change, added quotes to allow spaces in filenames, by Rajkumar Singh
//            header("Content-Disposition: attachment; filename=\"".basename($filename)."\";" );
//            header("Content-Transfer-Encoding: binary");
//            header("Content-Length: ".strlen($filedata));
////            
////            header("Content-Type: application/force-download; name=\"$filename\""); 
////            header("Content-Transfer-Encoding: binary"); 
////            header("Content-Length: ".strlen($filedata)); 
////            header("Content-Disposition: attachment; filename=\"$filename\""); 
////            header("Expires: 0"); 
////            header("Cache-Control: no-cache, must-revalidate"); 
////            header("Pragma: no-cache"); 
//            //readfile("$filename"); 
////            header("Content-length: ".strlen($filedata));
////            header("Content-type: $mimetype");
////            header("Content-disposition: download; filename=$filename"); //disposition of download forces a download
            break;


        // BAD ACTION //
        default:
            header('HTTP/1.1 500 Internal Server');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array('message' => 'ERROR : bad request', 'code' => 1337)));
    }

    // SORTIE
    print result($result);
} else {
    http_response_code(400);
}

function result($data) {
    if(!isset($data->data)){
        utf8_encode_deep($data);
    }
    $return = new stdClass();
    $return->status = "ok";
    if(is_object($data)){
         $return->data = $data;
    }else if($data === null){
       $return->data = null;
    } else{
        $return->data = $data==1?true:($data==0?false:$data); 
    }
    
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
