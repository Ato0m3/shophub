<template>
  <v-container class="pt-6">
    <FAB > 
      <v-card class="">
        <v-card-title>
          Add an items to the list
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newItem.title" label="Title" />
          <v-text-field v-model="newItem.quantity" label="Quantity" type="number" class=""/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="addItem">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </FAB>
    <v-alert v-if="success" type="success"> 
      List completed ! You can go :) 
    </v-alert>
      <v-list two-line>
        <v-list-item-group
          v-model="$store.state.selected"
          active-class="green--text"
          multiple
        >
          <template v-for="(item, index) in shoppingList">
            <v-list-item :key="index + item.id" @click="toggleCheckItem(item.id, item.checked)">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }} {{ item.checked }}</v-list-item-title>
                  <v-list-item-subtitle> 
                    x{{ item.quantity }}
                  </v-list-item-subtitle> 
                </v-list-item-content>

                 <v-list-item-action>
                     <v-btn icon @click.stop="deleteItem(item.id)">
                        <v-icon color="red lighten-1">mdi-delete-empty</v-icon>
                     </v-btn>
                  </v-list-item-action>

                <v-list-item-action>
                  <v-icon
                    v-if="!active"
                    color="grey lighten-1"
                  >
                    mdi-cart-arrow-down
                  </v-icon>
                  <v-icon
                    v-else
                    color="green darken-3"
                  >
                    mdi-cart-check
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider
              v-if="index < shoppingList.length - 1"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>

import FAB from "@/components/FAB"
import app from '@/feathers-client'

export default {
  name: "Home",
  components: {
    FAB,
  },
  computed: {
    shoppingList() {
      let itemList = this.$store.state.items
      if (itemList.length === 0) {
        this.$store.dispatch('FETCH_ITEMS')
        return []
      }
      return itemList
    },
    success() {
      return (this.$store.state.selected.length !== 0 
      && this.$store.state.selected.length === this.$store.state.items.length)
    }
  },
  data: () => ({
    newItem: { title: "", quantity: 1, checked: false }
  }),
  methods: {
    addItem() {
      app.service('items').create(this.newItem)
    },
    toggleCheckItem(id, ch) {
      app.service('items').patch(id, {checked: !ch})
    },
    deleteItem(id) {
      app.service('items').remove(id)
    }
  }
};
</script>
