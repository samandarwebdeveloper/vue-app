<script setup>
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators';
import { ref, computed } from 'vue';

const users = ref([
    {
        username: 'admin',
        password: 'Admin123@*'
    },
    {
        username: 'user',
        password: 'User123@*'
    }
]);


const logInUser = ref({
    username: null,
    password: null
});


const isLoggedIn = ref(false);
const error = ref(null);

// check local storage username and password
const checkUser = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
        logInUser.value = {
            username,
            password
        }
        isLoggedIn.value = true;
    }
}

window.addEventListener('load', checkUser);

const login = () => {
    const user = users.value.find(user => user.username === logInUser.value.username && user.password === logInUser.value.password);
    if (user) {
        isLoggedIn.value = true;
        error.value = null;
        localStorage.setItem('username', user.username);
        localStorage.setItem('password', user.password);
    } else {
        error.value = 'Invalid username or password';
    }
};


const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    isLoggedIn.value = false;
    error.value = null;
    logInUser.value = {
        username: '',
        password: ''
    };
};

</script>
<template>
    <div>
        <div class="login-wrap" v-if="!isLoggedIn">
            <h2>Login</h2>
            <form @submit.prevent="login">
                <label>Username</label>
                <input type="text" v-model="logInUser.username" placeholder="Enter username" required/>
                <label>Password</label>
                <input type="password" v-model="logInUser.password" placeholder="Enter password" required />
                <p v-if="error" class="error-msg">{{ error }}</p>
                <button type="submit">Login</button>
            </form>
        </div>
        <div v-if="isLoggedIn" class="user-wrap">
            <p>You are logged in</p>
            <p>{{logInUser.username}}</p>
            <p>{{logInUser.password}}</p>
            <button class="logout" @click="logout">Logout</button>
        </div>
    </div>
</template>

<style>
.login-wrap {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1.5em;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.login-wrap label {
    display: block;
    margin-bottom: 0.5em;
}
.login-wrap input {
    width: 100%;
    height: 3em;
    margin-bottom: 1em;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 3px;
}
.login-wrap button {
    width: 100%;
    height: 2.5em;
    margin-top: 1em;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #42b883;
    color: #fff;
}

.login-wrap button:hover {
    background: #42b883aa;
}
.error-msg {
    color: red;
    font-size: 12px;
}
.user-wrap {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1.5em;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.logout {
    display: block;
    margin: 1em auto;
}
</style>