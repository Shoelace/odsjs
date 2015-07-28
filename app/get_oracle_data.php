<?php
error_reporting(E_ALL ^ E_NOTICE);

// Include database credentials.
require_once('config.inc.php');


$conn = oci_pconnect(DB_USER, DB_PASS, DB_CONNECTIONSTRING);
if (!$conn) {
    $m = oci_error();
    trigger_error(htmlentities($m['message']), E_USER_ERROR);
}

$q = $_GET['sqlStr'];
$l = $_GET['limit'];
$s = $_GET['skip'];

//add limit and skip parameters

if (empty($q) ){
 print '[]';
}


$stid = oci_parse($conn, "$q");

oci_set_prefetch($stid, 500);  // Set before calling oci_execute()

$r = oci_execute($stid);

$nrows = oci_fetch_all($stid, $res, null, null, OCI_FETCHSTATEMENT_BY_ROW);


//echo "$nrows rows fetched<br>\n";
//var_dump($res);

oci_free_statement($stid);
oci_close($conn);

print (json_encode($res));

?>
