<template>
  <div class="home ma-4">
    <Posts />

    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import { fb } from '@/firebase'
import Posts from '@/components/Posts.vue'
export default {
  name: 'home',
  components: {
    Posts,
  },
  created() {
    if(!fb.auth().currentUser) {
      this.$router.push('/login')
    }
  },
}
</script>
