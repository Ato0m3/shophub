<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-toolbar-title class="">SHOPHUB</v-toolbar-title>
      <span class="ml-2">v1.0</span>
      <v-spacer></v-spacer>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
