<?php
/**
 * @Author: name
 * @Date:   2019-02-13 10:54:10
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 16:29:12
 */
require_once "./../config.php";
if(!empty($_GET)) {
    if (isset($_GET['page']) && isset($_GET['pageSize']) && isset($_GET['code'])) {
        $page = $_GET['page'];
        $pageSize = $_GET['pageSize'];
        $code = $_GET['code'];
        $pageSize *= $page;
        $page --;
        $page *= $_GET['pageSize'];
        $sql1 = "select distinct test_name from usertest where user_code = '$code'";
        $sql2 = "select distinct test_name as name, test_create_time as time from testinfo where test_name not in ($sql1) limit $page, $pageSize";
        $sql3 = "select count(distinct test_name) from testinfo where test_name not in ($sql1)";
        $res = $db -> getrows($sql2);
        $count = $db -> getone($sql3);
        $state = 1;
    } else {
        $count = 0;
        $state = 0;
        $res = array();
    }
    $response = array('data' => $res, 'state' => $state, 'count' => $count);
    echo json_encode($response);
}