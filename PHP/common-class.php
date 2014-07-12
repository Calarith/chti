<?php
header("Content-Type: charset=utf-8");
/** Include the database file */
include_once '../db/db.php';
include_once '../PHP/config.php';
/**
 * The main class of login
 * All the necesary system functions are prefixed with _
 * examples, _login_action - to be used in the login-action.php file
 * _authenticate - to be used in every file where admin restriction is to be inherited etc...
 * @author Swashata <swashata@intechgrity.com>
 */
class itg_common {

    /**
     * Holds the script directory absolute path
     * @staticvar
     */
    static $abs_path;

    /**
     * Store the sanitized and slash escaped value of post variables
     * @var array
     */
    var $post = array();

    /**
     * Stores the sanitized and decoded value of get variables
     * @var array
     */
    var $get = array();
    
    var $table = "";

    /**
     * The constructor function of admin class
     * We do just the session start
     * It is necessary to start the session before actually storing any value
     * to the super global $_SESSION variable
     */
    public function __construct($_table) {
        session_start();

        //store the absolute script directory
        //note that this is not the admin directory
        self::$abs_path = dirname(dirname(__FILE__));

        //initialize the post variable
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $this->post = $_POST;
            if(get_magic_quotes_gpc ()) {
                //get rid of magic quotes and slashes if present
                array_walk_recursive($this->post, array($this, 'stripslash_gpc'));
            }
        }
        
        //initialize the get variable
        $this->get = $_GET;
        $this->table = $_table;
        $this->columns = $this->get_columns();
        //decode the url
        array_walk_recursive($this->get, array($this, 'urldecode'));
    }
    
    

    /**
     * Retourne tous les témoignages.
     * @global ezSQL_mysql $db
     * @return tab
     */
    public function get_allEntities() {
        global $db;
        $query = "SELECT ";
        $exclued_field = ['data'];
        foreach ($this->columns as $key => $value){
            if(!in_array($value->Field, $exclued_field)){
                $query .= $value->Field.",";
            }       
        }
        $query = trim($query, ",");
        $query .= " FROM `".$this->table."`;";
        $result = $db->get_results($query);
        return $result;
       
    }
    
    
    // TODO : ajouter supprimer modifier valider/invalider
    
     /**
     * Ajoute témoignage. 
     * Requiert un nom, prénom et un message 
     * 
     */
    
    
    public function add_Entity($_param) {
        global $db;
        $query = "INSERT INTO `".$this->table."` (";
        $values = " VALUES (";
        foreach ($_param as $key => $value){
//            if($key == "data"){
//                $query .= $key . ", ";
//                $values .= " LOAD_FILE('" . $value."'), ";
//            }else{
                $query .= $key . ",";
                $values .= "'".$value."',";
            //}
            
        }
        $query .= "updated_at, created_at)";
        $query .= $values."now(), now() );";
        $result = $db->query($query);
        return $result>0;
        
    }
    
    /**
     * supprime un témoignage. 
     * Requiert un id
     * 
     */
    
    
    public function del_Entity($_param) {
        global $db;
        $result = $db->query("DELETE from `".$this->table."` WHERE id=".$_param->id.";");
        return $result;
        
    }
    
    /**
     * modifie un témoignage. 
     * Requiert l'id du temoignage a modifier, et nouveaux nom prénom message 
     * 
     */
    
    
    public function chg_Entity($_param) {
        global $db;
        $query = "UPDATE `".$this->table."` SET ";
        foreach ($_param as $key => $value){
            $query .= $key . "='".$value."',";
        }
        $query .= "updated_at = 'now()'";
        $query .= " WHERE id = '$_param->id'";
        $result = $db->query($query);
//        $result = $db->query("UPDATE `".$this->table."` SET nom = '".$nom."', prenom = '".$prenom."', telephone = '".$telephone."', adresse = '".$adresse."', ville = '".$ville."',cp = '".$cp."',cp = 'now()'   WHERE id = '$id' ;");
        return $result;
        
    } 
    
    public function download_DataEntity($_param) {
        global $db;
        $result = $db->get_row("SELECT data, data_filename, data_mimetype  FROM  `".$this->table."`  WHERE  id='".$_param->id."';");
        return $result;
        
    }
    
    public function download_DataFile($_param) {
        global $db;
        $result= $db->get_row("SELECT data_filename, data_mimetype, CONCAT('".TMP_DIR ."',data_filename) as TMP_PATH  FROM  `".$this->table."`  WHERE  id='".$_param->id."';");
        $res = $db->get_row('SELECT data INTO DUMPFILE "'.$result->TMP_PATH.'" FROM `'.$this->table.'`  WHERE  id="'.$_param->id.'";');
        return $result;
        
    }
    
    public function get_columns() {
        global $db;
        $result = $db->get_results("SHOW columns FROM `".$this->table."`;");
        //$result->data = fbsql_read_blob($result->data);
        return $result;
       
    }
   
    /**
     * stripslash gpc
     * Strip the slashes from a string added by the magic quote gpc thingy
     * @access protected
     * @param string $value
     */
    private function stripslash_gpc(&$value) {
        $value = stripslashes($value);
    }

    /**
     * htmlspecialcarfy
     * Encodes string's special html characters
     * @access protected
     * @param string $value
     */
    private function htmlspecialcarfy(&$value) {
        $value = htmlspecialchars($value);
    }

    /**
     * URL Decode
     * Decodes a URL Encoded string
     * @access protected
     * @param string $value
     */
    protected function urldecode(&$value) {
        $value = urldecode($value);
    }
}
