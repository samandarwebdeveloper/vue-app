<script setup>
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, numeric } from '@vuelidate/validators';
import { ref, computed } from 'vue';


const users = ref([
    {
        name: 'admin',
        password: 'Admin123@*',
        phone: '998991234567',
        pinfl: 15151551552545,
        birthday: '2000-01-01'
    },
    {
        name: 'user',
        password: 'User123@*',
        phone: '998991234567',
        pinfl: 15151551552545,
        birthday: '2000-01-01'
    }
]);

const isPassword = ref(false);

const newUser = ref({
    name: '',
    password: '',
    phone: '',
    pinfl: null,
    birthday: ''
});


const rules = computed(() => {
    return {
        name: {
            required,
            minLength: minLength(3)
        },
        password: {
            required,
            minLength: minLength(6)

        },
        phone: {
            required,
            numeric,
            minLength: minLength(12),
            maxLength: maxLength(12),
        },
        pinfl: {
            required,
            minLength: minLength(14),
            maxLength: maxLength(14)
        },
        birthday: {
            required
        }
    }
});

const v$ = useVuelidate(rules, newUser);

const addUser = async () => {
    const result = await v$.value.$validate();
    if (result) {
        users.value.push(newUser.value);
        newUser.value = {
            name: null,
            password: null,
            phone: null,
            pinfl: null,
            birthday: null
        };
        v$.value.$reset();
    }
}
</script>
<template>
    <div class="wrapper">
        <div class="form-wrap">
            <div class="form-box">
                <h2>Add user</h2>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" v-model="newUser.name" placeholder="Enter name"/>
                    <span v-for="error in v$.name.$errors" class="error-msg" :key="error.$uid">{{ error.$message }}</span>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input :type="isPassword ? 'text' : 'password'" v-model="newUser.password" placeholder="Enter password"/>
                    <button class="show-hide" @click="isPassword = !isPassword">{{ isPassword ?  'Hide' : 'Show' }}</button>
                    <span class="error-msg" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }}</span>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" v-model="newUser.phone" placeholder="Enter phone"/>
                    <span class="error-msg" v-for="error in v$.phone.$errors" :key="error.$uid">{{ error.$message }}</span>
                </div>
                <div class="form-group">
                    <label>PINFL</label>
                    <input type="number" v-model="newUser.pinfl" placeholder="Enter pinfl" />
                    <span class="error-msg" v-for="error in v$.pinfl.$errors" :key="error.$uid">{{ error.$message }}</span>
                </div>
                <div class="form-group">
                    <label>Birthday date</label>
                    <input type="date" v-model="newUser.birthday" />
                    <span class="error-msg" v-for="error in v$.birthday.$errors">{{ error.$message }}</span>
                </div>
                <button class="add-btn" @click="addUser">Add</button>
            </div>
        </div>
        <div class="users-wrap">
            <ul class="users-list">
                <li v-for="user in users">
                    <p>Name: <span>{{ user.name }}</span></p>
                    <p>Password: <span>{{ user.password }}</span></p>
                    <p>Phone: <span>{{ user.phone }}</span></p>
                    <p>PINFL: <span>{{ user.pinfl }}</span></p>
                    <p>Birthday date: <span>{{ user.birthday }}</span></p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.wrapper {
    display: flex;
    align-items: start;
    justify-content: space-evenly;
}
.form-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.form-box {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.form-group label {
    display: block;
    margin: 5px 0;
}
.form-group {
    position: relative;
}
.form-group input {
    width: 100%;
    padding: 10px 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.form-group .show-hide {
    position: absolute;
    top: 34px;
    right: 5px;
    background: #000000;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 14px;
}
.form-group .error-msg {
    color: #ff0000;
    font-size: 12px;
    margin-top: 5px;
}

.add-btn {
    display: block;
    margin: 10px 0 0 auto;
}
.users-list {
    max-width: 460px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
}
.users-list li {
    width: calc(50%-40px);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 10px;
}
.users-list li p {
    color: #ccc;
    font-size: 16px;
}
.users-list li p span {
    color: #3e75da;
}

</style>