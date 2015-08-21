<?php
error_reporting(E_ALL ^ E_NOTICE);

// Include database credentials.
require_once('config.inc.php');


$conn = oci_pconnect(DB_USER, DB_PASS, DB_CONNECTIONSTRING);
if (!$conn) {
    $m = oci_error();
    trigger_error(htmlentities($m['message']), E_USER_ERROR);
}

$q = $_GET['qryname'];
$l = $_GET['limit'];
$s = $_GET['skip'];

$params = json_decode(file_get_contents('php://input'), true);
//add limit and skip parameters


if (empty($q) ){
 print '[]';
}

  $callProcedureSql = "BEGIN $q(";

    if (isset($params)) {
        foreach ($params as $key => $value) {
            $callProcedureSql .= ":i_$key, ";
        }
    }

    $callProcedureSql .= ":cursbv); END;";
   // print "<pre>$callProcedureSql</pre>";
    $stid = oci_parse($conn, $callProcedureSql);
    //bind variabnles
   if (isset($params)) {
        foreach ($params as $key => $value) {
            //oci_bind_by_name($stid, ":i_$key", $value);
            oci_bind_by_name($stid, ":i_$key", $params[$key]);
        }
    }
    
    $curs = oci_new_cursor($conn);
    oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);
    
    $r = oci_execute($stid);

    // Execute the REF CURSOR like a normal statement id
    oci_execute($curs);
    $nrows = oci_fetch_all($curs, $res, null, null, OCI_FETCHSTATEMENT_BY_ROW);


//echo "$nrows rows fetched<br>\n";
//var_dump($res);

oci_free_statement($curs);
oci_free_statement($stid);
oci_close($conn);

print (json_encode($res));

?>
