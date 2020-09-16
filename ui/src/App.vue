<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

:root {
  --primary-color: #439a86;
  --secondary-color: #2a2d34;
  --muted-color: rgb(176, 176, 176);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Rubik", sans-serif;
}
.page {
  background: rgba(67, 154, 134, 0.15);
  height: 100vh;
  overflow: hidden;
}
button {
  box-shadow: none;
  background: transparent;
  border: none;
  color: inherit;
  font-family: "Rubik", sans-serif;
  font-size: inherit;
  font-weight: inherit;
  /* outline: none; */
  cursor: pointer;
  outline: none;
}

a {
  text-decoration: none;
  color: inherit;
}

li {
  list-style: none;
}
.container {
  width: 80%;
  margin: 0 auto;
}
</style>
