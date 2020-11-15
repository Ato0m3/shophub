import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/feathers-client'

Vue.use(Vuex)

export default new Vuex.Store({

   state: {
      items: [],
      selected: []
   },

   mutations: {
      CREATE_ITEM: function(state, item) {
         if (item.checked) {
            state.selected.push(state.items.length)
         }
         state.items.push(item)
      },
      UPDATE_ITEM: function(state, item) {
         state.items.forEach((it, index) => {
            if (item.id === it.id) {
               if (item.checked) {
                  state.selected.push(index)
               } else {
                  state.selected.slice(state.selected.indexOf(index), 1)
               }
               Vue.set(it, "checked", item.checked)
            }
         })
      },
      DELETE_ITEM: function(state, item) {
         let index = state.items.indexOf(item)
         state.items.splice(index, 1)
         state.selected.splice(state.selected.indexOf(index), 1)
      }
   },

   actions: {
      FETCH_ITEMS: async function({ commit }) {
         let itemList
         try {
            itemList = await app.service('items').find()
         } catch (error) {
            console.log(error);
         }
         itemList.forEach(item => {
            commit('CREATE_ITEM', item)
         })
      } 
   }
})

