<script setup>

</script>

<template>
    <header>
        <a href="/">
            <img src="../assets/vue.svg" class="logo" alt="Vue.js">
        </a>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Questions</router-link>
                </li>
                <li>
                    <router-link to="/login">Login</router-link>
                </li>
                <li>
                    <router-link to="/students">Students</router-link>
                </li>
                <li>
                    <router-link to="/form">Form</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>



<style scoped>
header {
    display: flex;
    align-content: center;
    justify-content: space-between;
}
.logo {
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
    display: flex;
    align-items: center;
}

nav ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style-type: none;
}

nav ul li {
    margin-left: 1em;
}
</style>