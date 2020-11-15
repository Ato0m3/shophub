<template>
  <div>
    <v-btn
      fab
      color="secondary"
      bottom
      right
      fixed
      @click="dialog = !dialog"
    >
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <slot/>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FAB",
  data: () => ({
    dialog: false,
  }),
};
</script>
