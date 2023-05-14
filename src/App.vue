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
import { supabase } from '@/services/supabaseService'
import { onBeforeMount } from 'vue'
import router from "@/router/router";

onBeforeMount(() => {
  supabase.auth.onAuthStateChange((event) => {
    if (event === "PASSWORD_RECOVERY") router.push('/auth/reset-password');
  })
});
</script>