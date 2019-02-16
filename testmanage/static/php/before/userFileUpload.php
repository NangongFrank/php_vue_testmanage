<?php
/**
 * @Author: name
 * @Date:   2019-02-12 11:49:20
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 17:46:53
 */
require_once "./../config.php";

$tip = "";
$state = 0;
if (!empty($_POST)) {
    if (isset($_POST['name']) && isset($_POST['code'])) {
        $name = $_POST['name'];
        $code = $_POST['code'];
        $text = $_POST['text'] ? $_POST['text'] : "";
        $date = date("Y-m-d H:i:s");
        $time = time();
        $fileName = $_FILES["file"]["name"];
        $kname = explode('.', $fileName);
        $kname = $time . mt_rand(1, 10000) . '.' .  $kname[count($kname) - 1];
        $fileState = move_uploaded_file($_FILES["file"]["tmp_name"], "./../userfiles/" . $kname);
        $path = "/testmanage/static/php/userfiles/";
        if ($fileState) {
            // 添加操作日志
            $sql1 = "insert into userUploadlog(ctrl_time, test_name, ctrl_type, user_code, test_task) values ('$date', '$name', 'up', '$code', '$text')";
            $sql2 = "insert into userfile(file_create_time, file_new_name, file_path, file_old_name, test_name) values ('$date', '$kname', '$path', '$fileName', '$name')";
            $count1 = $db -> datactrl($sql1);
            $count2 = $db -> datactrl($sql2);
            if ($count1 && $count2) {
                $tip = "文件上传保存成功";
                $state = 1;
            } else {
                $tip = "文件位置信息保存失败";
            }
        } else {
            $tip = "文件保存失败";
        }
    } else {
        $tip = "数据传递有误";
    }
    $res = array('msg' => $tip, 'state' => $state);
    echo json_encode($res);
}