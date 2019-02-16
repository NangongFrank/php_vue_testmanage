<?php
/**
 * @Author: name
 * @Date:   2019-01-21 14:45:06
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 19:52:17
 */

require_once "./../config.php";

$data = array();
$tip = "";
$state = 0;
if (!empty($_POST)) {
    if (!empty($_POST['name'])) {
        $name = $_POST['name'];
        $start = $_POST['start'] ? $_POST['start'] : "";
        $end = $_POST['end'] ? $_POST['end'] : "";
        $text = $_POST['text'] ? $_POST['text'] : "";
        $date = date("Y-m-d H:i:s");
        // 先进行表操作，在进行文档操作
        $sql = "select count(*) from testinfo where test_name = '$name'";
        $res = $db -> getone($sql);
        if ($res == 0) {
            $sql1 = "insert into `testinfo`(test_name, test_create_time, test_task, test_start, test_end) values ('$name', '$date', '$text', '$start', '$end')";
            $count = $db -> datactrl($sql1);
            if ($count == 0) {
                $tip = "项目基本信息保存失败";
                die();
            }
        }
        $time = time();
        $fileName = $_FILES["file"]["name"];
        $kname = explode('.', $fileName);
        $kname = $time . mt_rand(1, 10000) . '.' .  $kname[count($kname) - 1];
        $fileState = move_uploaded_file($_FILES["file"]["tmp_name"], "./../files/" . $kname);
        $path = "/testmanage/static/php/files/";
        if ($fileState) {
            $sql2 = "insert into `testfile`(file_create_time, file_new_name, file_path, file_old_name, test_name) values ('$date', '$kname', '$path', '$fileName', '$name')";
            $count = $db -> datactrl($sql2);
            if ($count > 0) {
                $tip = "文件上传保存成功";
                $state = 1;
            } else {
                $tip = "文件位置保存失败";
            }
        } else {
            $tip = "文件保存失败";
        }
    } else {
        $tip = "课题名称不可为空";
    }
    $res = array('data' => $data, 'msg' => $tip, 'state' => $state);
    echo json_encode($res);
}
# $_SERVER['HTTP_REFERER']