import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Questions from './views/Questions.vue'
import Login from './views/Login.vue'
import Students from './views/Students.vue'
import Form from './views/Form.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Questions
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/students',
            component: Students
        },
        {
            path: '/form',
            component: Form
        }
    ]
})


createApp(App).use(router).mount('#app')
