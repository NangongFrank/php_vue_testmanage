<?php
/**
 * @Author: name
 * @Date:   2019-01-21 10:38:58
 * @Last Modified by:   name
 * @Last Modified time: 2019-01-21 17:56:38
 */
require './../config.php';
if(!empty($_POST)) {
    $code = $_POST['code'];
    $type = $_POST['type'];
    if ($type == 'regest') {
        $name = $_POST['name'];
        $phone = $_POST['phone'] ? $_POST['phone'] : "";
        $pwd = $_POST['pwd'];
        $sql = "select count(*) from userinfo where user_code = '$code'";
        $res = $db -> getone($sql);
        if ($res != 0) {
            $tip = "注册失败，用户账号重复";
            $state = 0;
            $data = array();
        } else {
            $sql = "insert into `userinfo`(user_name, user_code, user_pwd, user_phone) value ('$name', '$code', '$pwd', '$phone')";
            $num = $db -> datactrl($sql);
            if ($num > 0) {
                $tip = "用户注册成功!";
                $state = 1;
                $data = array();
            } else {
                $tip = "用户注册失败!";
                $state = 0;
                $data = array();
            }
        }
    } else if ($type == 'login') {
        $pwd = $_POST['pwd'];
        $sql = "select user_code as code, user_name as name, user_phone as phone, before_time as beforeTime, type_code as userType from userinfo where user_code = '$code' and user_pwd = '$pwd'";
        $res = $db -> getrow($sql);
        if ($res) {
            $nowDateTime = date('Y-m-d H:i:s');
            $data = $res;
            $tip = '登录成功';
            $state = 1;
            $sql = "update `userinfo` set before_time = '$nowDateTime' where user_code = '$code' and user_pwd = '$pwd'";
            $db -> datactrl($sql);
        } else {
            $tip = "用户不存在或密码错误！";
            $state = 0;
            $data = array();
        }
    } else if ($type == 'recodeInfo') {
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $pwd = $_POST['pwd'];
        $newPwd = $_POST['newPwd'];
        $sql = "update `userinfo` set user_name = '$name', user_phone = '$phone', user_pwd = '$newPwd' where user_code = '$code' and user_pwd = '$pwd'";
        $res = $db -> datactrl($sql);
        if ($res > 0) {
            $sql = "select user_code as code, user_name as name, user_phone as phone, before_time as beforeTime, type_code as userType from userinfo where user_code = '$code'";
            $res = $db -> getrow($sql);
            $data = $res;
            $tip = "用户信息已更新";
            $state = 1;
        } else {
            $data = array();
            $tip = "用户信息更新失败";
            $state = 0;
        }
    }
    $response = array('data' => $data, 'msg' => $tip, 'state' => $state);
    echo json_encode($response);
}

