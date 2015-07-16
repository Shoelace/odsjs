<?php
error_reporting(E_ALL ^ E_NOTICE);
?>


<?php
$q = $_GET['sqlStr'];
$l = $_GET['limit'];
$s = $_GET['skip'];

//add limit and skip parameters

if (empty($q) ){
 print '[]';
}

#$c = oci_pconnect("phphol", "welcome", "//localhost/orcl:pooled");
//$conn = oci_pconnect("", "", "//abwdb.admin.abdn.ac.uk/esbdev");
$conn = oci_pconnect("system", "manager", "//localhost/XE");

$stid = oci_parse($conn, "$q");

$r = oci_execute($stid);

$nrows = oci_fetch_all($stid, $res, null, null, OCI_FETCHSTATEMENT_BY_ROW);

//echo "$nrows rows fetched<br>\n";
//var_dump($res);

oci_free_statement($stid);
oci_close($conn);

print (json_encode($res));
?>
