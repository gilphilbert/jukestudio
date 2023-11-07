<template>
<!---->
  <nav class="navbar is-danger">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item brand-text">
          <img src="../assets/logo.svg" alt="jukestudio logo">
          <img src="../assets/brand.svg" alt="jukestudio name">
        </div>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" @click="$emit('design')">
            Design
          </a>
          <a class="navbar-item print-titles" href="#" @click="$emit('print')">
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
  name: 'NavBar',
}
</script>
