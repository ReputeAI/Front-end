<template>
  <div>
    <Navbar />
    <UpgradeBanner />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import UpgradeBanner from './components/UpgradeBanner.vue';
</script>
