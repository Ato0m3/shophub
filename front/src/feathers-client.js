import Config from "@/config"

// Feathers configuration
import io from 'socket.io-client'
const socket = io(Config.dev)

import feathers from '@feathersjs/client'

import store from '@/store'

const app = feathers()

app.configure(feathers.socketio(socket, {transports: ['websocket']}))

// console.log("hey")

app.configure(feathers.authentication({ storage: window.localStorage }))

app.service('items').on('created', item => {
   console.log('ITEM EVENT created', item)
   store.commit('CREATE_ITEM', item)
})
app.service('items').on('patched', item => {
   console.log('ITEM EVENT patched', item)
   store.commit('UPDATE_ITEM', item)
})
app.service('items').on('removed', item => {
   console.log('ITEM EVENT removed', item)
   store.commit('DELETE_ITEM', item)
})


export default app
