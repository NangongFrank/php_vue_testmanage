<?php

/**
 * @Author: frank_zhao
 * @Date:   2019-02-11 21:14:45
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 14:05:58
 */
require_once "./../config.php";

if (!empty($_GET)) {
	if (isset($_GET['token'])) {
		$token = $_GET['token'];
		$sql = "select f.file_path as path, f.file_new_name as fileName, f.file_old_name as showName from testfile as f where test_name = '$token'";
		$sql1 = "select test_name as name, test_task as task from testinfo where test_name = '$token'";
		$files = $db -> getrows($sql);
		$res = $db -> getrow($sql1);
		$res['files'] = $files;
		$response = array('data' => $res, 'state' => 1, 'msg' => '获取数据成功');
		echo json_encode($response);
	}
}
if (!empty($_POST)) {
	if (isset($_POST['code']) && isset($_POST['name'])) {
		$code = $_POST['code'];
		$name = $_POST['name'];
		$date = date("Y-m-d H:i:s");
		$sql = "select count(*) from usertest where test_name = '$name'";
		$result = $db -> getone($sql);
		if (!$result) {
			$db -> ctrlautocommit();
			$sql1 = "insert into usertest values";
			$sql1 .= "(null, '$code', '$name', '$date')";
			$result = $db -> datactrl($sql);
			$sql2 = "insert into testtask(test_name, user_code) values ('$name', '$code')";
			$sql3 = "insert into useruploadlog(ctrl_time, test_name, ctrl_type, user_code) values ";
			$sql3 .= "('$date', '$name', 'down', '$code')";
			$result1 = $db -> datactrl($sql1);
			$result2 = $db -> datactrl($sql2);
			$result3 = $db -> datactrl($sql3);
			if ($result1 && $result2 && $result3) {
				$state = 1;
				$msg = '接受课题成功';
				$db -> ctrlcommit();
			} else {
				$state = 0;
				$msg = '接受课题失败';
				$db -> ctrlrollback();
			}
		} else {
			$state = 0;
			$msg = '不可重复接受课题';
		}
	} else {
		$state = 0;
		$msg = '传参有误';
	}
	$response = array('state' => $state, 'msg' => $msg);
	echo json_encode($response);
}