-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 20, 2019 at 03:52 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testmanage`
--

-- --------------------------------------------------------

--
-- Table structure for table `testfile`
--

CREATE TABLE `testfile` (
  `file_id` int(11) NOT NULL,
  `file_create_time` datetime NOT NULL,
  `file_new_name` varchar(30) NOT NULL COMMENT '文件在系统中的名称',
  `file_path` varchar(80) NOT NULL COMMENT '文件保存路径',
  `file_old_name` varchar(80) NOT NULL COMMENT '文件上传是名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `testinfo`
--

CREATE TABLE `testinfo` (
  `test_id` int(11) NOT NULL,
  `test_name` varchar(50) NOT NULL COMMENT '课题名称',
  `test_create_time` datetime NOT NULL,
  `test_task` text COMMENT '课题说明'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `testtask`
--

CREATE TABLE `testtask` (
  `task_id` int(11) NOT NULL,
  `user_code` varchar(20) NOT NULL,
  `task_content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(16) NOT NULL,
  `user_code` varchar(20) NOT NULL,
  `user_pwd` varchar(20) NOT NULL,
  `user_phone` char(11) DEFAULT NULL,
  `type_code` char(1) NOT NULL DEFAULT '1' COMMENT '1普通用户，0管理员',
  `user_state` char(1) DEFAULT NULL COMMENT '保留字段，用于验证用户是否登录'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`user_id`, `user_name`, `user_code`, `user_pwd`, `user_phone`, `type_code`, `user_state`) VALUES
(1, '韫泽', 'root', '1234', '18888888888', '0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usertest`
--

CREATE TABLE `usertest` (
  `course_id` int(11) NOT NULL,
  `user_code` varchar(20) NOT NULL,
  `test_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `type_id` int(11) NOT NULL,
  `type_code` char(1) NOT NULL DEFAULT '1',
  `role_name` varchar(20) NOT NULL,
  `role_token` varchar(20) DEFAULT NULL COMMENT '保留字段，用于标识用户类型'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `testfile`
--
ALTER TABLE `testfile`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `testinfo`
--
ALTER TABLE `testinfo`
  ADD PRIMARY KEY (`test_id`);

--
-- Indexes for table `testtask`
--
ALTER TABLE `testtask`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `usertest`
--
ALTER TABLE `usertest`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `testfile`
--
ALTER TABLE `testfile`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `testinfo`
--
ALTER TABLE `testinfo`
  MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `testtask`
--
ALTER TABLE `testtask`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `usertest`
--
ALTER TABLE `usertest`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usertype`
--
ALTER TABLE `usertype`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
