const router = new VueRouter({
    routes : [{
        path : '/home',
        components : {
            default : tools.home,
            user : tools.login
        },
        children : [{
            path : '/home/usercenter',
            name : 'usercenter',
            component : tools.userCenter
            }, {
            path : '/home/testcenter',
            name : 'testcenter',
            component : tools.testCenter
            }, {
            path : '/home',
            component : tools.indexPage
            }, {
            path : '/home/testctrl',
            name : 'testctrl',
            component : tools.testCtrl
            }, {
            path : '/home/testinfo',
            name : 'testinfo',
            component : tools.testInfo
        }]
    }, {
        path : '/regest',
        component : tools.regest
    }, {
        path : "/",
        redirect : "/home"
    }]
})