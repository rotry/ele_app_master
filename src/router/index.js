import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace方法
//第一个参数，跳转地址，传递哪些参数
VueRouter.prototype.push = function (location, reslove, reject) {

    if (reslove && reject) {
        //call||apply区别：相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call和apply传递参数，call传递参数用逗号隔开，apply方法传递数组
        originPush.call(this, location, reslove, reject);
    } else {
        originPush.call(this, location, () => {
        }, () => {
        });
    }
}

VueRouter.prototype.replace = function (location, reslove, reject) {
    if (reslove && reject) {
        originReplace.call(this, location, reslove, reject);
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        });
    }
}
const routes = [
    {
        path: '/',
        component: () => import('../views/index'),
        children: [
            {
                path: '',
                redirect: '/home'
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home'),
                meta:{
                    title:'主页'
                }
            },
            {
                path: '/me',
                name: 'me',
                component: () => import('../views/Me'),
                meta:{
                    title:'个人中心'
                }
            },
            {
                path: '/order',
                name: 'order',
                component: () => import('../views/Order'),
                meta:{
                    title:'订单'
                }
            },
            {
                path: '/search',
                name: 'search',
                component: () => import('../views/Search'),
                meta:{
                    title:'搜索'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login')
    },
    {
        path: '/cities',
        name: 'cities',
        component: () => import('../views/Cities'),
        meta:{
            title:'选择城市'
        }
    },
    {
        path: '/city/:id',
        name: 'city',
        component: () => import('../views/City'),
        meta:{
            title:'详细地址'
        },
        props: ($route) => {
            return {
                id: $route.params.id,
            }
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = !!localStorage.getItem('user_id');
    if (to.path === '/login') {
        next();
    } else {
        // 判断是否在登陆条件下
        isLogin ? next() : next('/login');
    }
})
export default router
