<?php
/**
 * @Author: name
 * @Date:   2019-01-21 08:36:27
 * @Last Modified by:   name
 * @Last Modified time: 2019-02-13 13:54:33
 */
$config = array(
    'host' => 'localhost',
    'port' => '3306',
    'user' => 'root',
    'pwd' => '',
    'dbname' => 'testmanage',
    'charset' => 'utf8'
);
date_default_timezone_set('PRC');
class MysqliDB {
    private static $link = null;
    private static $db = null;
    private function __construct($config) {
       $li = mysqli_connect("{$config['host']}:{$config['port']}",
        $config['user'], $config['pwd'], $config['dbname']);
       if ($li) {
            $this :: $link = $li;
            $this -> charset($config['charset']);
       } else {
            echo "数据库连接失败";
            die();
       }
    }
    function getlink ($config) {
        if (self :: $link) {
            return self :: $db;
        } else {
            $newDb = new self($config);
            self :: $db = $newDb;
            return $newDb;
        }
    }
    # 数据库操作部分
    function charset ($chr) {
        mysqli_set_charset($this :: $link, $chr);
    }
    function changedb ($dbname) {
        mysqli_select_db($this :: $link, $dbname);
    }
    # 数据查询部分
    function getrow ($sql) {
        $result = mysqli_query($this :: $link, $sql);
        if ($result) {
            $res = mysqli_fetch_assoc($result);
            mysqli_free_result($result);
            return $res;
        } else {
            return false;
        }
    }
    function getrows ($sql) {
        $result = mysqli_query($this :: $link, $sql);
        $res = array();
        if ($result) {
            while ($row = mysqli_fetch_assoc($result)) {
                array_push($res, $row);
            }
            mysqli_free_result($result);
            return $res;
        } else {
            return false;
        }
    }
    function getone($sql) {
        $result = mysqli_query($this :: $link, $sql);
        if ($result) {
            $res = mysqli_fetch_row($result)[0];
            mysqli_free_result($result);
            return $res;
        } else {
            return false;
        }
    }
    # 数据操作部分
    function datactrl($sql) {
        mysqli_query($this :: $link, $sql);
        $res = mysqli_affected_rows($this :: $link);
        return $res;
    }
    # 关闭数据库
    function __destruct() {
        mysqli_close($this :: $link);
    }
    function geterror() {
        return mysqli_error($this :: $link);
    }
    function ctrlautocommit() {
        return mysqli_autocommit($this :: $link, false);
    }
    function ctrlcommit() {
        return mysqli_commit($this :: $link);
    }
    function ctrlrollback() {
        return mysqli_rollback($this :: $link);
    }
}
$db = MysqliDB :: getlink($config);

?>