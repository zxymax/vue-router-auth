<template>
  <div class="dashboard-layout">
    <nav>
      <RouterLink to="/dashboard">Dashboard</RouterLink> |
      <RouterLink to="/reports">Reports</RouterLink> |
      <RouterLink to="/settings">Settings</RouterLink> |
      <RouterLink to="/">Logout</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
<style scoped>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
