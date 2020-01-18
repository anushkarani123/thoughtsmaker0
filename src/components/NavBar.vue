<template>
  <div class="navbar">
    <v-app-bar app color="green" dark>
      <v-app-bar-nav-icon class="d-flex d-sm-flex d-md-none" @click="drawer = !drawer" v-if="user !== null"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img alt="Thoughts Maker Logo" class="shrink mr-2" contain src="@/assets/tm.png" transition="scale-transition" width="60"/>
        <v-img alt="Thoughts Maker Name" class="shrink mt-1 hidden-down" contain min-width="100" src="@/assets/tmn.png" max-width="150"/>
        <!--<v-img alt="Thoughts Maker Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100" src="@/assets/tmn.png" max-width="150"/>-->
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-sm-none d-md-flex" v-if="user !== null">
        <v-btn v-for="(item, index) in items" :key="index" link :to="item.route" text>
          <span class="mr-2">{{ item.name }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>

      <v-btn class="d-none d-sm-none d-md-flex"  @click="logout" text v-show="user !== null">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>    
      </v-toolbar-items>

      

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" disable-resize-watcher absolute temporary color="green" dark>
        <v-list-item>
          <v-list-item-avatar v-if="user !== null">
            <!--<v-img :src="user.photoURL"></v-img>-->
            <v-img src="@/assets/tm.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content v-if="user !== null">
            <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-divider></v-divider>


        <v-list dense>

          <v-list-item class="mb-1" v-for="(item, index) in items" :key="index" link :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      <template v-slot:append>
        <div>
          <v-btn tile block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  
    <v-snackbar v-model="snackbar" :timeout="3000" top>{{ text }}</v-snackbar>

  </div>

</template>

<script>
import { fb } from '@/firebase'
export default {
  name: 'NavBar',

  components: {

  },

  data: () => ({
    snackbar: false,
    text: '',
    drawer: false,
    items: [
      { name: 'Home', icon: 'mdi-home', route: '/' },
      { name: 'Add New Post', icon: 'mdi-post', route: '/addnewpost' },
      { name: 'Profile', icon: 'mdi-account', route: '/profile' },
    ],
    user: null,
  }),
  created() {
    if(!fb.auth().currentUser) {
      this.$router.push('/login')
    } else {
      this.user = fb.auth().currentUser
    }
  },
  methods: {
    logout() {
      fb.auth().signOut().then( () => {
        this.snackbar = true
        this.text = 'User logged out successfully!'
        this.$router.push('/login')
      })
    }
  }
};
</script>