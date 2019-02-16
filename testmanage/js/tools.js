const tools = {
    regest: {
        template: `<div class="regest">
            <div class="regest-box box1">
                <form autocomplete="off">
                    <h2>注册</h2>
                    <ul>
                        <li>
                            <span>用户名</span>
                            <input type="text" v-model="name" placeholder="不超过10个字"/>
                        </li>
                        <li>
                            <span>账号</span>
                            <input type="text" v-model="code" placeholder="不超过20个字符"/>
                        </li>
                        <li>
                            <span>登录密码</span>
                            <input type="password" autocomplete="pwd" v-model="pwd" placeholder="不超过20个字符"/>
                        </li>
                        <li>
                            <span>确认密码</span>
                            <input type="password" autocomplete="rePwd" v-model="rePwd"
                            placeholder="不超过20个字符"/>
                        </li>
                        <li>
                            <span>联系号码</span>
                            <input type="text" v-model="phone"/>
                        </li>
                        <li class="submit">
                            <button type="button" class="layui-btn" @click="regest">立即注册</button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="regest-box box2">
                <form autocomplete="off">
                    <h2>已有账号登录</h2>
                    <ul>
                        <li>
                            <i class="layui-icon layui-icon-username"></i>
                            <input type="text" v-model="loginCode" placeholder="账号"/>
                        </li>
                        <li>
                            <i class="layui-icon layui-icon-password"></i>
                            <input type="password" autocomplete="pwd" v-model="loginPwd" placeholder="密码"/>
                        </li>
                        <li class="submit">
                            <button type="button" class="layui-btn" @click="login">登录</button>
                        </li>
                    </ul>
                </form>
            </div>

        </div>`,
        data: function() {
            return {
                code: "",
                rePwd: "",
                pwd: "",
                phone: "",
                name: "",
                loginCode: "",
                loginPwd: ""
            }
        },
        methods: {
            regest: function() {
                var vm = this
                if (!vm.name) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("用户名不可为空", {
                            time: 1400
                        })
                    })
                    return
                }
                if (!vm.code) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("账号不能为空", {
                            time: 1400
                        })
                    })
                    return
                }
                if (!vm.pwd || !vm.rePwd) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("密码不可为空", {
                            time: 1400
                        })
                    })
                    return
                }
                if (vm.pwd != vm.rePwd) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("两次密码输入不一致", {
                            time: 1400
                        })
                    })
                    return
                }

                vm.$http.post('./static/php/before/loginRegest.php', {
                    name: vm.name,
                    code: vm.code,
                    pwd: vm.pwd,
                    phone: vm.phone,
                    type: 'regest'
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    res = res.data
                    if (res.state == 1) {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                vm.name = ""
                                vm.code = ""
                                vm.pwd = ""
                                vm.phone = ""
                                vm.rePwd = ""
                            })
                        })
                    } else {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                vm.name = ""
                                vm.code = ""
                                vm.pwd = ""
                                vm.phone = ""
                                vm.rePwd = ""
                            })
                        })
                    }
                })
            },
            login: function() {
                var vm = this,
                    tmd = tools.methods
                if (!vm.loginCode) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("账号不能为空", {
                            time: 1400
                        })
                    })
                    return
                }
                if (!vm.loginPwd) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("密码不可为空", {
                            time: 1400
                        })
                    })
                    return
                }
                vm.$http.post('./static/php/before/loginRegest.php', {
                    code: vm.loginCode,
                    pwd: vm.loginPwd,
                    type: 'login'
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    res = res.data
                    if (res.state == 1) {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                tmd.setUserInfo(res.data)
                                vm.$router.push('/home')
                            })
                        })
                    } else {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                vm.loginCode = ""
                                vm.loginPwd = ""
                            })
                        })
                    }
                })
            }
        }
    },
    login: {
        template: `<div class="user-box">
            <div class="user" v-if="state">
                <form autocomplete="off" @keyup.enter="login">
                    <h2>用户登录</h2>
                    <div class="content-box">
                        <ul>
                            <li>
                                <i class="layui-icon layui-icon-username"></i>
                                <input type="text" v-model="loginCode" placeholder="账号"/>
                            </li>
                            <li>
                                <i class="layui-icon layui-icon-password"></i>
                                <input type="password" v-model="loginPwd" autocomplete="pwd" placeholder="密码"/>
                            </li>
                            <li class="submit">
                                <button type="button" class="layui-btn layui-btn-normal" @click="login">立即登录</button>
                            </li>
                            <li class="submit">
                                <button type="button" class="layui-btn layui-btn-primary" @click="regest">前往注册</button>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <div class="user-info" v-else>
                <h2>用户信息</h2>
                <div class="content-box">
                    <ul>
                        <li>
                            <span>账号: <em>{{userInfo.code}}</em></span>
                        </li>
                        <li>
                            <span>姓名: <em>{{userInfo.name}}</em></span>
                        </li>
                        <li>
                            <span>联系电话: <em>{{userInfo.phone}}</em></span>
                        </li>
                        <li>
                            <span>上次登录时间: <em>{{userInfo.beforeTime}}</em></span>
                        </li>
                        <li class="my-tast">
                            <a href="javascript:;"
                            v-if="!myPower"
                            @click="myTest">我的课题</a>
                            <a href="javascript:;"
                            v-else
                            @click="testCtrl">课题管理</a>
                            <a href="javascript:;"
                            @click="recodeInfo">修改个人信息</a>
                        </li>
                        <li class="logout">
                            <a class="layui-btn layui-btn-primary" href="javascript:;" @click="logout">注销</a>
                        </li>
                    </ul>
                </div>
            </div>
            <recode-info
            @res="response($event)"
            :state="infoState"
            :info="infoData"/>
        </div>
        `,
        data: function() {
            return {
                loginCode: "",
                loginPwd: "",
                state: true,
                userInfo: {},
                infoState: false,
                infoData: {}
            }
        },
        methods: {
            login: function() {
                var vm = this,
                    tmd = tools.methods
                if (!vm.loginCode) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("账号不能为空", {
                            time: 1400
                        })
                    })
                    return
                }
                if (!vm.loginPwd) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("密码不可为空", {
                            time: 1400
                        })
                    })
                    return
                }
                vm.$http.post('./static/php/before/loginRegest.php', {
                    code: vm.loginCode,
                    pwd: vm.loginPwd,
                    type: 'login'
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    res = res.data
                    if (res.state == 1) {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                vm.userInfo = res.data
                                tmd.setUserInfo(res.data)
                                vm.state = false
                                vm.loginCode = ""
                                vm.loginPwd = ""
                            })
                        })
                    } else {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                vm.loginCode = ""
                                vm.loginPwd = ""
                            })
                        })
                    }
                })
            },
            regest: function() {
                var vm = this
                vm.$router.push("/regest")
            },
            myTest: function() {
                var vm = this
                vm.$router.push({
                    name: 'usercenter'
                })
            },
            testCtrl: function() {
                var vm = this
                vm.$router.push({
                    name: 'testctrl'
                })
            },
            logout: function() {
                var vm = this,
                    path = vm.$route.path,
                    tmd = tools.methods
                layui.use("layer", function() {
                    var layer = layui.layer,
                        ly

                    ly = layer.confirm("确定退出么?", function() {
                        // 教师发布和用户中心退出登录，返回主页面
                        if (path == '/home/usercenter' || '/home/testctrl') {
                            vm.$router.replace({
                                path: "/home"
                            })
                        }
                        tmd.setUserInfo("")
                        layer.close(ly)
                        vm.state = true
                    })
                })

            },
            response: function(val) {
                var vm = this,
                    tmd = tools.methods,
                    info
                if (tmd.getUserInfo()) {
                    vm.userInfo = tmd.getUserInfo()
                    vm.state = false
                } else {
                    vm.userInfo = {}
                    vm.state = true
                }
                vm.infoState = val[1]
                vm.userInfo = val[0]
            },
            recodeInfo: function() {
                var vm = this
                vm.infoData = {}
                setTimeout(function() {
                    vm.infoData = vm.userInfo
                    vm.infoState = true
                }, 10)
            }
        },
        created: function() {
            var vm = this,
                tmd = tools.methods,
                info
            if (tmd.getUserInfo()) {
                vm.userInfo = tmd.getUserInfo()
                vm.state = false
            } else {
                vm.userInfo = {}
                vm.state = true
            }
        },
        computed: {
            myPower: function() {
                var vm = this,
                    info = vm.userInfo
                if (info.userType == 1) {
                    return false
                } else {
                    return true
                }
            }
        }
    },
    home: {
        template: `<div class="home">
            <router-view></router-view>
        </div>`
    },
    indexPage: {
        template: `<div class="index">
            <h2>最新任务</h2>
            <ul class="test-content">
                <li
                @click="jumpToTestInfo(value)"
                v-for="(value,index) in taskList">
                    <span>{{value.name}}</span>
                    <em>{{value.createTime}}</em>
                </li>
            </ul>
            <div class="more" v-show="taskState">
                <a href="javascript:;"
                @click="getTaskMore">加载更多&gt;&gt;</a>
            </div>
            <h2>最新学员动态</h2>
            <ul class="user-action">
                <li
                v-for="(val, index) in activeList">
                    <div class="action-text">
                        学员:<strong>{{val.userName}}</strong>&nbsp;
                        <strong style="color: #f40" v-text="val.type == 'up' ? '上传文件至' : '接收'"></strong>&nbsp;
                        课题:<span>{{val.name}}</span>
                    </div>
                    <em>{{val.time}}</em>
                </li>
            </ul>
            <div class="more" v-show="activeState">
                <a href="javascript:;"
                @click="getActiveMore">加载更多&gt;&gt;</a>
            </div>
        </div>`,
        methods: {
            jumpToTestInfo: function(val) {
                var vm = this
                vm.$router.push({
                    path: '/home/testinfo',
                    query: {
                        q: val.name
                    }
                })
            },
            getTaskList: function() {
                var vm = this,
                    page = vm.taskPage,
                    pageSize = vm.taskPageSize,
                    arr
                vm.$http.get('./static/php/before/indexNewTest.php',
                    {params: {page, pageSize, type: "task"}}).then(function(res) {
                        res = res.data
                        arr = vm.taskList.concat(res.data)
                        vm.taskList = arr
                        if (page * pageSize < res.count) {
                            vm.taskState = true
                        } else {
                            vm.taskState = false
                        }
                    })
            },
            getTaskMore: function() {
                var vm = this
                vm.taskPage ++
                vm.getTaskList()
            },
            getActiveList: function() {
                var vm = this,
                    page = vm.activePage,
                    pageSize = vm.activePageSize
                vm.$http.get('./static/php/before/indexNewTest.php',
                    {params: {page, pageSize, type: "active"}}).then(function(res) {
                        res = res.data
                        arr = vm.activeList.concat(res.data)
                        vm.activeList = arr
                        if (page * pageSize < res.count) {
                            vm.activeState = true
                        } else {
                            vm.activeState = false
                        }
                    })
            },
            getActiveMore: function() {
                var vm = this
                vm.activePage ++
                vm.getActiveList()
            }
        },
        data: function() {
            return {
                taskPage: 1,
                taskPageSize: 5,
                taskState: false,
                taskList: [],
                activePage: 1,
                activePageSize: 7,
                activeState: false,
                activeList: []
            }
        },
        created: function() {
            var vm = this
            vm.getTaskList()
            vm.getActiveList()
        }
    },
    testCenter: {
        template: `<div class="test-center">
            <h2>任务列表</h2>
            <ul class="test-content">
                <li
                @click="jumpToTestInfo(value)"
                v-for="(value,index) in list">
                    <span>{{value.name}}</span>
                    <em>{{value.createTime}}</em>
                </li>
            </ul>
            <div class="more" v-show="state">
                <a href="javascript:;" @click="getMore">加载更多&gt;&gt;</a>
            </div>
        </div>`,
        data: function() {
            return {
                page: 1,
                pageSize: 8,
                list: [],
                state: false
            }
        },
        methods: {
            jumpToTestInfo: function(val) {
                var vm = this
                vm.$router.push({
                    path: '/home/testinfo',
                    query: {
                        q: val.name
                    }
                })
            },
            getMore: function() {
                var vm = this
                vm.page ++
                vm.getList()
            },
            getList: function() {
                var vm = this,
                    page = vm.page,
                    pageSize = vm.pageSize,
                    arr = []
                vm.$http.get('./static/php/before/indexNewTest.php',
                    {params: {type: "task", page, pageSize}}).then(function(res) {
                    res = res.data
                    arr = vm.list.concat(res.data)
                    vm.list = arr
                    if (res.count >= page * pageSize) {
                        vm.state = true
                    } else {
                        vm.state = false
                    }
                })
            }
        },
        created: function() {
            var vm = this
            vm.getList()
        }
    },
    userCenter: {
        template: `<div class="user-center">
            <h2>我的课题</h2>
            <div>
                <input type="text" style="width: 260px; display: inline-block" v-model="myTest" class="layui-input">
                <a href="javascript:;" class="layui-btn"
                @click="searchTest"><i class="layui-icon-search layui-icon"></i>搜索</a>
            </div>
            <ul class="using">
                <li v-for="(value, index) in list">
                    <a href="javascript:;" class="layui-icon layui-icon-close" @click="closeThis(value)"></a>
                    <a href="javascript:;" @click="userAlter(value)" class="layui-icon layui-icon-upload"></a>
                    <strong>课题名称:</strong>
                    <p>{{value.name}}</p>
                    <strong>接受课题时间:</strong>
                    <p>{{value.time}}</p>
                    <strong>操作记录:</strong>
                    <ol>
                        <li
                        v-for="(val, ind) in value.log">{{val.time}} <strong v-text="val.type == 'up' ? '课题文件提交' : '课题接收'"></strong></li>
                    </ol>
                    <strong>指导老师评价:</strong>
                    <p
                    v-for="v in value.content">{{v.content}}</p>
                </li>
            </ul>
            <div class="more" v-show="userState">
                <a href="javascript:;"
                @click="getListMore">加载更多&gt;&gt;</a>
            </div>
            <h2>可接课题</h2>
            <ul class="test-content">
                <li
                @click="jumpToTestInfo(val)"
                v-for="(val,index) in testList">
                    <span>{{val.name}}</span>
                    <em>{{val.time}}</em>
                </li>
            </ul>
            <div class="more" v-show="testPageState">
                <a href="javascript:;"
                @click="getTestListMore">加载更多&gt;&gt;</a>
            </div>
            <user-alter
            @res="response($event)"
            :state="state"
            :info="testInfo"/>
        </div>`,
        methods: {
            jumpToTestInfo: function(val) {
                var vm = this
                vm.$router.push({
                    path: '/home/testinfo',
                    query: {
                        q: val.name
                    }
                })
            },
            closeThis: function(val) {
                var vm = this,
                    tmd = tools.methods,
                    code = tmd.getUserInfo()['code'],
                    name = val.name
                layui.use('layer', function() {
                    var layer = layui.layer,
                        ly
                    ly = layer.confirm("确定放弃此课题工作么？", function() {
                        vm.$http.post('./static/php/before/userTest.php',
                            {code, name},
                            {emulateJSON: true}).then(function(res) {


                                vm.page = 1
                                vm.testPage = 1
                                vm.list = []
                                vm.testList = []
                                vm.getList()
                                vm.getTestList()
                                layer.close(ly)
                            })
                    })
                })
            },
            userAlter: function(val) {
                var vm = this
                vm.state = true
                vm.testInfo = val
            },
            response: function(val) {
                this.state = false
            },
            getList: function() {
                var vm = this,
                    page = vm.page,
                    pageSize = vm.pageSize,
                    token = vm.myTest,
                    tmd = tools.methods,
                    code = tmd.getUserInfo()['code'],
                    arr
                if (!token) {
                    token = "*"
                }
                vm.$http.get('./static/php/before/userTest.php',
                    {params: {token, page, pageSize, code}}).then(function(res) {
                        res = res.data
                        arr = vm.list.concat(res.data)
                        vm.list = arr
                        if (page * pageSize < res.count) {
                            vm.userState = true
                        } else {
                            vm.userState = false
                        }
                    })
            },
            getListMore: function() {
                var vm = this
                vm.page ++
                vm.getList()
            },
            searchTest: function() {
                var vm = this
                vm.page = 1
                vm.list = []
                vm.getList()
            },
            getTestList: function() {
                var vm = this,
                    page = vm.testPage,
                    pageSize = vm.testPageSize,
                    tmd = tools.methods,
                    code = tmd.getUserInfo()['code'],
                    arr
                vm.$http.get('./static/php/before/userUnusing.php',
                    {params: {page, pageSize, code}}).then(function(res) {
                        res = res.data
                        arr = vm.testList.concat(res.data)
                        vm.testList = arr
                        if (page * pageSize < res.count) {
                            vm.testPageState = true
                        } else {
                            vm.testPageState = false
                        }
                    })
            },
            getTestListMore: function() {
                var vm = this
                vm.testPage ++
                vm.getTestList()
            }
         },
        data: function() {
            return {
                testInfo: {},
                state: false,
                list: [],
                userState: false,
                page: 1,
                pageSize: 2,
                myTest: "",
                testList: [],
                testPage: 1,
                testPageSize: 6,
                testPageState: false,
            }
        },
        created: function() {
            var vm = this
            vm.getList()
            vm.getTestList()
        }
    },
    userUpload: {
        template: `<div class="user-alter" @click="closeAlter" v-show="state">
            <div class="alter-box" style="height:300px;">
                <span>上传说明</span>
                <div>
                    <textarea rows="8" cols="50" v-model="text"></textarea>
                </div>
                <span>上传文件列表</span>
                <a href="javascript:;" id="upload"><i class="layui-icon layui-icon-upload"></i>选择文件</a>
                <ul class="upload-list">
                    <li v-for="val in list">{{val.name}}</li>
                </ul>
                <div class="upload-btn">
                    <button class="layui-btn" id="uploadBtn" @click="upload">提交</button>
                </div>
            </div>
        </div>`,
        data: function() {
            return {
                text: "",
                list: [],
                fileList: {}
            }
        },
        props: ['state', 'info'],
        methods: {
            closeAlter: function(e) {
                var vm = this,
                    tag = e.target
                classList = tag.classList
                if (classList.contains('user-alter')) {
                    vm.$emit("res", false)
                    vm.state = false
                }
            },
            upload: function() {

            }
        },
        mounted: function() {
            var vm = this
            layui.use('upload', function() {
                var upload = layui.upload
                upload.render({
                    elem: "#upload",
                    url: './static/php/before/userFileUpload.php',
                    // post 请求传递数据
                    data: {},
                    accept: 'file',
                    exts: 'doc|docx|ppt|pptx|xls|xlsx|zip|rar',
                    multiple: true,
                    auto: false,
                    bindAction: "#uploadBtn",
                    choose: function(obj) {
                        vm.fileList = obj.pushFile()
                        obj.preview(function(index, info, fileBase64Code) {
                            vm.list.push({
                                name: info.name,
                                index: index
                            })
                        })
                        console.log(vm.info)

                    },
                    before: function() {
                        var up = this,
                            text = vm.text,
                            tmd = tools.methods,
                            code = tmd.getUserInfo()['code'],
                            testName = vm.info,
                            name = testName.name,
                            res = {
                                text,
                                code,
                                name,
                            }
                        up.data = res
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.load()
                        })
                    },
                    allDone: function() {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg('课题提交成功', {
                                time: 1200
                            }, function() {
                                location.reload();
                            })
                        })

                    },
                    error: function() {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.closeAll()
                        })
                    }
                })
            })
        }
    },
    testInfo: {
        template: `<div class="test-info">
            <h2>任务详情</h2>
            <div class="info-content">
                <div class="info-title">
                    <span>课题名称</span>
                    <em>{{list.name}}</em>
                </div>
                <div class="info-task">
                    <span>课题说明</span>
                    <p>{{list.task}}</p>
                </div>
                <div class="info-footer">
                    <span>附件</span>
                    <ul>
                        <li
                        v-for="(value, index) in list.files">
                            <a :href="value.path + '/' + value.fileName" target="_blank" :download="value.showName" title="下载">{{value.showName}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="ctrl-nav" v-show="isUser">
                <li>
                    <a class="layui-btn layui-btn-normal" href="javascript:;"
                    @click="getTask">接收课题</a>
                </li>
            </ul>
        </div>`,
        created: function() {
            // 采用name ~ params传值 - 热刷新数据消失
            // 有点 数据不会存在url上
            var vm = this,
                query = vm.$route.query,
                tmd = tools.methods,
                userInfo = tmd.getUserInfo()
            if (!userInfo.userType) {
                vm.isUser = false
            } else {
                vm.isUser = true
            }
            vm.getList(query.q)
        },
        data: function() {
            return {
                isUser: false,
                list: []
            }
        },
        methods: {
            getList: function(name) {
                var vm = this
                vm.$http.get('./static/php/before/testInfo.php',
                    {params: {token: name}}).then(function(res) {
                    res = res.data
                    vm.list = res.data
                })
            },
            getTask: function() {
                // 将当前课题添加到个人的课题中
                var vm = this,
                    tmd = tools.methods,
                    info = tmd.getUserInfo(),
                    code = info['code'],
                    type = info['userType'],
                    query = vm.$route.query,
                    name = query.q
                if (type == 0) {
                    layui.use('layer', function() {
                        var layer = layui.layer
                        layer.msg('管理员不能接收课题', {time: 1100})
                    })
                    return
                }
                vm.$http.post('./static/php/before/testInfo.php',
                    {name, code},
                    {emulateJSON: true}).then(function(res) {
                        res = res.data
                        layui.use('layer', function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {time: 800})
                        })
                    })
            }
        }
    },
    testCtrl: {
        template: `<div class="test-ctrl">
            <h2>学员文件上传记录</h2>
            <div class="my-list-search">
                <span>模糊筛选</span>
                <input type="text" class="layui-input" v-model="userText" placeholder="输入学员名称" />
                <button class="layui-btn" @click="searchUser"><i class="layui-icon layui-icon-search"></i>搜索</button>
            </div>
            <ul class="my-all-list">
                <li
                v-for="(val, index) in userList">
                    <div class="li-left">
                        <div class="left-top">
                            <span>课题名称</span>
                            <em>{{val.name}}</em>
                        </div>
                        <div class="left-center">
                            <span>学员名称</span>
                            <em>{{val.userName}}</em>
                        </div>
                        <div class="left-bottom">
                            <span>评价内容</span>
                            <em style="cursor: default" :title="val.testTask">{{val.content}}</em>
                        </div>
                    </div>
                    <div class="li-right">
                        <a href="javascript:;" @click="userCtrl(val)">点评</a>
                        <a href="javascript:;" class="files-list" title="本次上传文件列表">
                            文件
                            <ul class="list-item" >
                                <li
                                v-for="v in val.files">
                                    <a
                                    :href="v.path + v.fileName"
                                    :title="'创建时间' + v.time"
                                    :download="v.fileOldName"
                                    v-text="v.fileOldName"></a>
                                </li>
                            </ul>
                        </a>
                    </div>
                </li>
            </ul>
            <div class="more" v-show="userListState">
                <a href="javascript:;" @click="getMoreTest">加载更多&gt;&gt;</a>
            </div>
            <a href="javascript:;" @click="teacherAlter" class="layui-btn layui-icon layui-icon-add-1">发布课题</a>
            <h2>所有课题记录</h2>
            <div class="my-list-search">
                <span>模糊筛选</span>
                <input type="text" class="layui-input" v-model="myList" placeholder="输入课题名称" />
                <button @click="searchTest" class="layui-btn"><i class="layui-icon layui-icon-search"></i>搜索</button>
            </div>
            <ul class="my-all-list">
                <li
                v-for="(val, index) in testList">
                    <div class="li-left">
                        <div class="left-top">
                            <span>课题名称</span>
                            <em>{{val.name}}</em>
                        </div>
                        <div class="left-bottom">
                            <span>发布时间</span>
                            <em>{{val.createTime}}</em>
                        </div>
                    </div>
                    <div class="li-right">
                        <a href="javascript:;" style="visibility:hidden">修改</a>
                        <a href="javascript:;" @click="deleteItem(val)">删除</a>
                    </div>
                </li>
            </ul>
            <div class="more" v-show="testListState">
                <a href="javascript:;" @click="getMoreData">加载更多&gt;&gt;</a>
            </div>
            <teacher-alter
             @res="response($event)"
            :state="state"
            :info="testInfo"/>
            <user-tast
            @res="userRes($event)"
            :state="userTask"
            :info="testInfo"/>
        </div>`,
        data: function() {
            return {
                state: false,
                userTask: false,
                testInfo: {},
                myList: "",
                userList: [],
                testList: [],
                testListState: false,
                userListState: false,
                page: 1,
                pageSize: 3,
                userPage: 1,
                userPageSize: 3,
                userText: ""
            }
        },
        methods: {
            response: function(val) {
                console.log(val)

                this.state = val[1]
            },
            teacherAlter: function(val) {
                var vm = this
                vm.testInfo = val
                vm.state = true
            },
            deleteItem: function(val) {
                var vm = this,
                    name = val.name
                layui.use("layer", function() {
                    var layer = layui.layer,
                        ly
                    ly = layer.confirm("确定删除已选课题？", function() {
                        vm.$http.post('./static/php/before/teacherAndtest.php',
                            {name},
                            {emulateJSON: true}).then(function(res) {
                                res = res.data
                                if (res.state == 1) {
                                    layui.use('layer', function() {
                                        var layer = layui.layer
                                        layer.msg(res.msg, {icon: 1, time: 800}, function() {
                                            vm.page = 1
                                            vm.testList = []
                                            vm.getData()
                                            layer.close(ly)
                                        })
                                    })
                                } else {
                                    layui.use('layer', function() {
                                        var layer = layui.layer
                                        layer.msg(res.msg, {icon: 2, time: 800}, function() {
                                            layer.close(ly)
                                        })
                                    })
                                }
                            })
                    })
                })
            },
            userRes: function(val) {
                this.userTask = false
            },
            userCtrl: function(val) {
                var vm = this
                vm.testInfo = val
                vm.userTask = true
            },
            getData: function() {
                var vm = this,
                    page = vm.page,
                    pageSize = vm.pageSize,
                    token = vm.myList,
                    arr
                if (!token) {
                    token = "*"
                }
                vm.$http.get('./static/php/before/teacherAndtest.php', {
                    params: {
                        page,
                        pageSize,
                        token
                    }
                }).then(function(res) {
                    res = res.data
                    if (res.state == 1) {
                        arr = vm.testList.concat(res.data)
                        vm.testList = arr
                        if (vm.page * vm.pageSize < res.count) {
                            vm.testListState = true
                        } else {
                            vm.testListState = false
                        }
                    }
                })
            },
            getMoreData: function() {
                var vm = this
                    ++vm.page
                vm.getData()
            },
            searchTest: function() {
                var vm = this
                vm.page = 1
                vm.testList = []
                vm.getData()
            },
            getUserTest: function() {
                var vm = this,
                    page = vm.userPage,
                    pageSize = vm.userPageSize,
                    token = vm.userText,
                    arr
                if (!token) {
                    token = "*"
                }
                vm.$http.get('./static/php/before/teacherAndUser.php', {
                    params: {
                        page,
                        pageSize,
                        token
                    }
                }).then(function(res) {
                    res = res.data
                    if (res.state == 1) {
                        arr = vm.userList.concat(res.data)
                        vm.userList = arr
                        if (vm.userPage * vm.userPageSize < res.count) {
                            vm.userListState = true
                        } else {
                            vm.userListState = false
                        }
                    }
                })
            },
            getMoreTest: function() {
                var vm = this
                ++ vm.userPage
                vm.getUserTest()
            },
            searchUser: function() {
                var vm = this
                vm.userPage = 1
                vm.userList = []
                vm.getUserTest()
            },
        },
        created: function() {
            var vm = this
            vm.getData()
            vm.getUserTest()
        }
    },
    teacherUpload: {
        template: `<div class="user-alter" @click="closeAlter" v-show="state">
            <div class="alter-box">
                <form autocomplete="off" name="teacherUpload">
                    <ol class="test-text">
                        <li>
                            <span>课题名称</span>
                            <input type="text" placeholder="输入课题名称" name="name" class="layui-input" />
                        </li>
                        <li>
                            <span>开始时间</span>
                            <input type="text" readonly name="start" placeholder="课题开始时间" class="layui-input" onclick="WdatePicker({lang:'zh-cn', dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
                        </li>
                        <li>
                            <span>结束时间</span>
                            <input type="text" name="end" placeholder="课题结束时间" readonly class="layui-input"  onclick="WdatePicker({lang:'zh-cn', dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                        </li>
                    </ol>
                    <span>课题说明</span>
                    <div>
                        <textarea rows="8" cols="50" name="text"></textarea>
                    </div>
                </form>
                <span>上传文件列表</span>
                <a href="javascript:;" id="upload"><i class="layui-icon layui-icon-upload"></i>选择文件</a>
                <ul class="upload-list">
                    <li v-for="val in list" title="点击不上传此文件" @click="cancelFile(val.index)" style="cursor:pointer;">{{val.name}}</li>
                </ul>

                <div class="upload-btn">
                    <button class="layui-btn" id="uploadBtn" @click="upload">提交</button>
                </div>
            </div>
        </div>`,
        data: function() {
            return {
                list: [],
                fileList: "",
                name: "",
                start: "",
                end: "",
                text: ""
            }
        },
        props: ['state', 'info'],
        methods: {
            closeAlter: function(e) {
                var vm = this,
                    tag = e.target
                classList = tag.classList
                if (classList.contains('user-alter')) {
                    vm.$emit("res", false)
                    vm.state = false
                }
            },
            upload: function() {
                var vm = this
            },
            cancelFile: function(index) {
                var vm = this
                for (var i in vm.fileList) {
                    if (i == index) {
                        delete vm.fileList[i]
                    }
                }
                vm.list.map(function(val, i) {
                    if (val.index == index) {
                        vm.list.splice(i, 1)
                    }
                })
            }
        },
        mounted: function() {
            var vm = this
            layui.use('upload', function() {
                var upload = layui.upload
                upload.render({
                    elem: "#upload",
                    url: './static/php/before/fileUpload.php',
                    // post 请求传递数据
                    data: {},
                    accept: 'file',
                    exts: 'doc|docx|ppt|pptx|xls|xlsx|zip|rar',
                    multiple: true,
                    auto: false,
                    bindAction: "#uploadBtn",
                    choose: function(obj) {
                        vm.fileList = obj.pushFile()
                        obj.preview(function(index, info, fileBase64Code) {
                            vm.list.push({
                                name: info.name,
                                index: index
                            })
                        })
                    },
                    before: function() {
                        var up = this,
                            form = document.forms['teacherUpload'],
                            name = form['name'].value,
                            start = form['start'].value,
                            end = form['end'].value,
                            text = form['text'].value,
                            res = {
                                name: name,
                                start: start,
                                end: end,
                                text: text
                            }
                        up.data = res
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.load()
                        })
                    },
                    allDone: function() {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg('课题发布成功', {
                                time: 1200
                            }, function() {
                                location.reload()
                            })
                        })

                    },
                    error: function() {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.closeAll()
                        })
                    }
                })
            })
        },
        watch: {
            info: function(val) {
                console.log(val)
            }
        }
    },
    userTask: {
        template: `<div class="user-alter" @click="closeAlter" v-show="state">
            <div class="alter-box" style="height:210px;">
                <span>点评内容</span>
                <div>
                    <textarea rows="8" cols="50" v-model="text"></textarea>
                </div>
                <div class="upload-btn">
                    <button class="layui-btn" @click="save">保存</button>
                </div>
            </div>
        </div>`,
        data: function() {
            return {
                text: ""
            }
        },
        props: ['state', 'info'],
        methods: {
            closeAlter: function(e) {
                var vm = this,
                    tag = e.target
                classList = tag.classList
                if (classList.contains('user-alter')) {
                    vm.$emit("res", false)
                    vm.state = false
                }
            },
            save: function() {
                var vm = this,
                    info = vm.info,
                    code = info.code,
                    name = info.name,
                    text = vm.text
                    if (!text) {
                        text = ""
                    }
                layui.use("layer", function() {
                    var layer = layui.layer
                    layer.confirm("确定保存么?", function() {
                        vm.$http.post('./static/php/before/teacherAndUser.php',
                            {code, name, text},
                            {emulateJSON: true}).then(function(res) {
                                res = res.data
                                layui.use('layer', function() {
                                    var layer = layui.layer
                                    layer.msg(res.msg, {time: 800}, function() {
                                        location.reload()
                                    })
                                })
                            })

                        //location.reload()
                    })
                })


            }
        },
        watch: {
            info: function(val) {
                var vm = this
                vm.text = val.testTask
            }
        }
    },
    recodeInfo: {
        template: `<div class="user-alter" @click="closeAlter" v-show="state">
            <form autocomplete="off">
                <div class="alter-box" style="height:360px;">
                    <span>姓名</span>
                    <div>
                        <input class="layui-input" type="text" v-model="name" placeholder="用户名" />
                    </div>
                    <span>原始密码</span>
                    <div>
                        <input class="layui-input" v-model="pwd" type="password" autocomplete="pwd" placeholder="输入原始密码" />
                    </div>
                    <span>新密码</span>
                    <div>
                        <input class="layui-input" v-model="newPwd" type="password" autocomplete="newPwd" placeholder="输入新密码" />
                    </div>
                    <span>确认密码</span>
                    <div>
                        <input class="layui-input" v-model="reNewPwd" type="password" autocomplete="reNewPwd" placeholder="确认新密码" />
                    </div>
                    <span>电话</span>
                    <div>
                        <input class="layui-input" v-model="phone" type="text" placeholder="联系电话" />
                    </div>
                    <div class="upload-btn" style="margin-top:15px;">
                        <button class="layui-btn" id="uploadBtn" @click="save">保存</button>
                    </div>
                </div>
            </form>
        </div>`,
        data: function() {
            return {
                name: "",
                phone: "",
                code: "",
                pwd: "",
                newPwd: "",
                reNewPwd: ""
            }
        },
        props: ['state', 'info'],
        methods: {
            closeAlter: function(e) {
                var vm = this,
                    tag = e.target,
                    tmd = tools.methods
                classList = tag.classList
                if (classList.contains('user-alter')) {
                    vm.$emit("res", [tmd.getUserInfo(), false])
                    vm.state = false
                }
            },
            save: function() {
                var vm = this,
                    tmd = tools.methods
                if (!vm.name) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("用户名不可为空", {
                            time: 1400
                        })
                    })
                    return
                }
                if (!vm.pwd || !vm.newPwd || !vm.reNewPwd) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("密码不可为空", {
                            time: 1400
                        })
                    })
                    return
                }
                if (vm.newPwd != vm.reNewPwd) {
                    layui.use("layer", function() {
                        var layer = layui.layer
                        layer.msg("两次新密码输入不一致", {
                            time: 1400
                        })
                    })
                    return
                }
                vm.$http.post('./static/php/before/loginRegest.php', {
                    name: vm.name,
                    phone: vm.phone,
                    code: vm.code,
                    pwd: vm.pwd,
                    newPwd: vm.newPwd,
                    type: 'recodeInfo'
                }, {
                    emulateJSON: true
                }).then(function(res) {
                    res = res.data
                    if (res.state == 1) {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                vm.name = ""
                                vm.phone = ""
                                vm.code = ""
                                vm.pwd = ""
                                vm.newPwd = ""
                                vm.reNewPwd = ""
                                tmd.setUserInfo(res.data)
                                vm.$emit("res", [res.data, false])
                                vm.state = false
                            })
                        })
                    } else {
                        layui.use("layer", function() {
                            var layer = layui.layer
                            layer.msg(res.msg, {
                                time: 1400
                            }, function() {
                                vm.name = ""
                                vm.phone = ""
                                vm.code = ""
                                vm.pwd = ""
                                vm.newPwd = ""
                                vm.reNewPwd = ""
                            })
                        })
                    }
                })
            }
        },
        watch: {
            info: function(val) {
                var vm = this
                vm.name = val.name
                vm.phone = val.phone
                vm.code = val.code
            }
        }
    },
    methods: {
        setUserInfo: function(val) {
            if (val instanceof Object) {
                localStorage.userInfo = JSON.stringify(val)
            } else {
                localStorage.removeItem('userInfo')
            }
        },
        getUserInfo: function() {
            if (localStorage.userInfo) {
                return JSON.parse(localStorage.userInfo)
            } else {
                return ''
            }

        }
    }
}