<?php
/**
 * @Author: name
 * @Date:   2019-01-21 17:51:04
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 17:29:40
 */
require_once "./../config.php";

if (!empty($_GET)) {
	if (isset($_GET['token']) && isset($_GET['page']) && isset($_GET['pageSize'])) {
		$token = $_GET['token'];
		$page = $_GET['page'];
		$pageSize = $_GET['pageSize'];
		$start = ($page - 1) * $pageSize;
		$end = $pageSize;
		$sql1 = "select distinct i.test_name as name, i.test_task as task, i.test_create_time as createTime, i.test_start as startTime, i.test_end as endTime, f.file_new_name as fileName, f.file_old_name as fileOldName, f.file_path as filePath ";
		$sql1 .= "from testinfo as i join testfile as f on i.test_name = f.test_name ";
		$sql2 = "select count(distinct i.test_name) from testinfo as i join testfile as f on i.test_name = f.test_name ";
		switch ($token) {
			case '*':
				$sql1 .= "limit {$start}, {$end}";
				break;

			default:
				$sql1 .= "where i.test_name like '%$token%' limit {$start}, {$end}";
				$sql2 .= "where i.test_name like '%$token%'";
				break;
		}
		$res = $db -> getrows($sql1);
		$count = $db -> getone($sql2);
		$response = array('data' => $res, 'state' => 1, 'msg' => '获取数据成功', 'count' => $count);
		echo json_encode($response);
	}
}
if (!empty($_POST)) {
	if (isset($_POST['name'])) {
		$name = $_POST['name'];
		$sql1 = "select file_new_name as name from testfile where test_name = '$name'";
		$sql2 = "delete from testfile where test_name = '$name'";
		$sql3 = "delete from testinfo where test_name = '$name'";
		$rows = $db -> getrows($sql1);
		$db -> ctrlautocommit();
		$result2 = $db -> datactrl($sql2);
		$result3 = $db -> datactrl($sql3);
		if ($result3 && $result2) {
			foreach ($rows as $key => $value) {
				unlink("./../files/".$value['name']);
			}
			$res = array('msg' => '删除成功', 'state' => 1);
			$db -> ctrlcommit();
		} else {
			$res = array('msg' => '删除失败', 'state' => 0);
			$db -> ctrlrollback();
		}

	} else {
		$res = array('msg' => '传参错误', 'state' => 0);
	}
	echo json_encode($res);
}
