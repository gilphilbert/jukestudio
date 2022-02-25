<template>
  <nav class="navbar is-danger">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item brand-text" href="#">
          <img src="../assets/logo.svg" alt="jukestudio logo">
          <img src="../assets/brand.svg" alt="jukestudio name">
        </a>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item add-record" href="#">
            Records
          </a>
          <a class="navbar-item change-design" href="#">
            Design
          </a>
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
