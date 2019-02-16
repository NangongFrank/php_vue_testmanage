CREATE TABLE testinfo (
test_id int PRIMARY KEY AUTO_INCREMENT,
test_name varchar(50) NOT null COMMENT '课题名称',
test_create_time datetime NOT null,
test_task text COMMENT '课题说明'
);
CREATE TABLE testfile (
file_id int PRIMARY KEY AUTO_INCREMENT,
file_create_time datetime NOT null,
file_new_name varchar(30) NOT null COMMENT '文件在系统中的名称',
file_path varchar(80) NOT null COMMENT '文件保存路径',
file_old_name varchar(80) NOT null COMMENT '文件上传是名称'
);
CREATE TABLE userinfo (
user_id int PRIMARY KEY AUTO_INCREMENT,
user_name varchar(16) NOT null,
user_code varchar(20) NOT null,
user_pwd varchar(20) NOT null,
user_phone char(11),
type_code char(1) NOT null DEFAULT '1' COMMENT '1普通用户，0管理员',
user_state char(1) COMMENT '保留字段，用于验证用户是否登录'
);
CREATE TABLE usertype (
type_id int PRIMARY KEY AUTO_INCREMENT,
type_code char(1) NOT null DEFAULT '1',
role_name varchar(20) NOT null,
role_token varchar(20) COMMENT '保留字段，用于标识用户类型'
);
CREATE TABLE usertest  (
course_id int PRIMARY KEY AUTO_INCREMENT,
user_code varchar(20) NOT null,
test_id int NOT null
);
CREATE TABLE testtask (
task_id int PRIMARY key AUTO_INCREMENT,
user_code varchar(20) NOT null,
task_content text
);