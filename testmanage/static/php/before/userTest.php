<?php
/**
 * @Author: name
 * @Date:   2019-02-12 14:07:33
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 18:05:53
 */
require_once "./../config.php";
if(!empty($_GET)) {
    if (isset($_GET['token']) && isset($_GET['page']) && isset($_GET['pageSize']) && isset($_GET['code'])) {
        $token = $_GET['token'];
        $page = $_GET['page'];
        $pageSize = $_GET['pageSize'];
        $code = $_GET['code'];
        $pageSize *= $page;
        $page --;
        $page *= $_GET['pageSize'];
        $sql1 = "select u.course_id as id, u.user_code as code, u.test_name as name, u.create_time as createTime from usertest as u";
        $sql4 = "select t.test_name as name, t.task_content as content from testtask as t";
        $sql2 = "select log.ctrl_time as time, log.test_name as name, log.ctrl_type as type from usertest as u join useruploadlog as log on log.test_name = u.test_name";
        $sql3 = "select count(*) from usertest as u join testinfo as i on u.test_name = i.test_name";
        if ($token == "*") {
            $sql1 .= " where u.user_code = '$code' limit {$page}, {$pageSize}";
            $sql4 .= " where t.user_code = '$code' limit {$page}, {$pageSize}";
            $sql2 .= " where log.user_code = '$code'";
            $sql3 .= " where u.user_code = '$code'";
        } else {
            $sql1 .= " where u.test_name like '%$token%' and u.user_code = '$code' limit {$page}, {$pageSize}";
            $sql4 .= " where t.test_name like '%$token%' and t.user_code = '$code' limit {$page}, {$pageSize}";
            $sql2 .= " where log.user_code = '$code' and log.test_name like '%$token%'";
            $sql3 .= " where u.user_code = '$code' and u.test_name like '%$token%'";
        }
        $res1 = $db -> getrows($sql1);
        $res2 = $db -> getrows($sql2);
        $res3 = $db -> getrows($sql4);
        $res = array();
        $count = $db -> getone($sql3);
        foreach ($res1 as $key => $value) {
            $cache1 = array();
            $cache2 = array();
            foreach ($res2 as $k => $v) {
                if ($value['name'] == $v['name']) {
                    $cache1[] = $v;
                }
            }
            foreach ($res3 as $k => $v) {
                if ($value['name'] == $v['name']) {
                    $cache2[] = $v;
                }
            }
            $value['log'] = $cache1;
            $value['content'] = $cache2;
            array_push($res, $value);
        }
        $state = 1;
    } else {
        $count = 0;
        $state = 0;
        $res = array();
    }
    $response = array('data' => $res, 'state' => $state, 'count' => $count);
    echo json_encode($response);
}
if (!empty($_POST)) {
    if (isset($_POST['code']) && isset($_POST['name'])) {
        $code = $_POST['code'];
        $name = $_POST['name'];
        $db -> ctrlautocommit();
        ## 清除该项目的操作记录和项目与用户绑定记录
        $sql1 = "delete from usertest where user_code = '$code' and test_name = '$name'";
        $sql2 = "delete from useruploadlog where user_code = '$code' and test_name = '$name'";
        $sql4 = "delete from testtask where user_code = '$code' and test_name = '$name'";
        $sql3 = "select count(*) from useruploadlog where user_code = '$code' and test_name = '$name'";
        $sql6 = "select file_new_name as name from userfile where test_name = '$name'";
        $sql5 = "delete from userfile where test_name = '$name'";
        $rows = $db -> getrows($sql6);
        $result = $db -> datactrl($sql1);
        $resutl4 = $db -> datactrl($sql4);
        $resutl5 = $db -> datactrl($sql5);
        if ($result && $resutl4) {
            foreach($rows as $key => $value) {
                unlink('./../userfiles/'.$value['name']);
            }
            $count = $db -> getone($sql3);
            if ($count > 0) {
                $result = $db -> datactrl($sql2);
                if ($result) {
                    $res = array('state' => 1, 'msg' => '操作成功');
                    $db -> ctrlcommit();
                } else {
                    $db -> ctrlrollback();
                    $res = array('state' => 0, 'msg' => '操作失败');
                }
            } else {
                $res = array('state' => 1, 'msg' => '操作成功');
                $db -> ctrlcommit();
            }

        } else {
            $db -> ctrlrollback();
            $res = array('state' => 0, 'msg' => '操作失败');
        }
        echo json_encode($res);
    }
}