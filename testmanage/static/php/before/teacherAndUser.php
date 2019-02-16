<?php
/**
 * @Author: name
 * @Date:   2019-02-12 16:07:43
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 17:23:50
 */
require_once "./../config.php";
if (!empty($_GET)) {
    if (isset($_GET['token']) && isset($_GET['page']) && isset($_GET['pageSize'])) {
        $token = $_GET['token'];
        $page = $_GET['page'];
        $pageSize = $_GET['pageSize'];
        $start = ($page - 1) * $pageSize;
        $end = $pageSize;
        $sql1 = "select distinct u.test_name as name, u.user_code as code, t.task_content as content, i.user_name as userName from ";
        $sql2 = "select count(distinct t.test_name) from ";
        $from = "testtask as t join usertest as u on t.test_name = u.test_name join userinfo as i on i.user_code = u.user_code join userUploadlog as log on log.user_code = u.user_code ";
        $sql1 .= $from;
        $sql2 .= $from;
        $sql3 = "select file_path as path, file_new_name as fileName, file_old_name as fileOldName, test_name as name, file_create_time as time from userfile order by file_create_time desc ";
        switch ($token) {
            case '*':
                $sql1 .= "where log.ctrl_type = 'up' limit {$start}, {$end}";
                $sql2 .= "where log.ctrl_type = 'up'";
                break;

            default:
                $sql1 .= "where i.user_name like '%$token%' and log.ctrl_type = 'up' limit {$start}, {$end}";
                $sql2 .= "where i.user_name like '%$token%' and log.ctrl_type = 'up'";
                $sql3 .= "where test_naem like '%$token%'";
                break;
        }
        $res = $db -> getrows($sql1);
        $userFiles = $db -> getrows($sql3);
        foreach ($res as $key => $value) {
            $arr = array();
            foreach ($userFiles as $k => $v) {
                if ($v['name'] == $value['name']) {
                    $arr[] = $v;
                }
            }
            $res[$key]['files'] = $arr;
        }

        $count = $db -> getone($sql2);
        $response = array('data' => $res, 'state' => 1, 'msg' => '获取数据成功', 'count' => $count, 'err' => $db -> geterror());
        echo json_encode($response);
    }
}
if (!empty($_POST)) {
    if (isset($_POST['name']) && isset($_POST['code']) && isset($_POST['text'])) {
        $name = $_POST['name'];
        $code = $_POST['code'];
        $text = $_POST['text'];
        $sql = "update testtask set task_content = '$text' ";
        $sql .= "where test_name = '$name' and user_code = '$code'";
        $res = $db -> datactrl($sql);
        if ($res > 0) {
            $msg = '点评成功';
            $state = 1;
        } else {
            $msg = '点评失败';
            $state = 0;
        }
    } else {
        $msg = '请求参数有误';
        $state = 0;
    }
    $response = array('msg' => $msg, 'state' => $state);
    echo json_encode($response);
}