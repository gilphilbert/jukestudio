<template>
<!---->
  <nav class="navbar is-danger">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-text" to="/">
          <img src="../assets/logo.svg" alt="jukestudio logo">
          <img src="../assets/brand.svg" alt="jukestudio name">
        </router-link>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item" to="/">
            Records
          </router-link>
          <router-link class="navbar-item" to="/design">
            Design
          </router-link>
          <a class="navbar-item print-titles" href="#">
            Print
          </a>
          <a class="navbar-item import-export" href="#">
            Import/export
          </a>
          <a class="navbar-item import-export" href="https://github.com/gilphilbert/jblabels/issues">
            Help
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
