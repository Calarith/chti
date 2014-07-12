<?php
include_once 'config.php';
if(isset($_GET['filename'])){
   $file = TMP_DIR.$_GET['filename'];
}

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    unlink($file);
    exit;
}else{
    echo 'Une erreur est survenue.';
    
    header('Location: '.$_SERVER['HTTP_REFERER']);
}

?>