<template>
  <main class="h-screen flex flex-col">
    <Nav />
    <section class="grow">
      <router-view />
    </section>
    <Footer />
  </main>
</template>

<script setup>
import Nav from "@/components/Nav/Nav.vue";
import Footer from "@/components/Footer/Footer.vue";

</script>