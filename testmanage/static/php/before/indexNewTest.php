<?php
/**
 * @Author: name
 * @Date:   2019-02-12 17:20:16
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 16:22:28
 */
require_once "./../config.php";
if (!empty($_GET)) {
    if (isset($_GET['page']) && isset($_GET['pageSize']) && isset($_GET['type'])) {
        $type = $_GET['type'];
        $page = $_GET['page'];
        $pageSize = $_GET['pageSize'];
        $start = ($page - 1) * $pageSize;
        $end = $pageSize;
        if ($type == 'task') {
            $sql1 = "select distinct i.test_name as name, i.test_create_time as createTime from testinfo as i  order by test_create_time desc limit {$start}, {$end}";
            $sql2 = "select count(distinct test_name) from testinfo";
        } else if ($type == "active"){
            $sql1 = "select distinct l.ctrl_time as time, l.test_name as name, l.ctrl_type as type, i.user_name as userName from useruploadlog as l join userinfo as i on l.user_code = i.user_code order by l.ctrl_time desc limit {$start}, {$end}";
            $sql2 = "select count(distinct log.test_name) from useruploadlog as l join userinfo as i on l.user_code = i.user_code";
        }
        $res = $db -> getrows($sql1);
        $count = $db -> getone($sql2);
        $response = array('data' => $res, 'state' => 1, 'msg' => '获取数据成功', 'count' => $count);
        echo json_encode($response);
    }
}