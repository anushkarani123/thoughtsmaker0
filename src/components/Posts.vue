<template>
  <div class="posts">
    <v-item-group>
      <v-container fluid>
        <v-row>
          <v-col :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'pa-0': $vuetify.breakpoint.smAndDown, 'ma-0': $vuetify.breakpoint.mdAndUp}" v-for="(post, index) in posts" :key="index" cols="12" sm="6" md="3">
            <v-card class="mx-auto" max-width="500" tile>

              <v-img class="red--text align-end" height="200px" :src="post.image">
                <v-card-title>{{ post.title }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">By {{ post.user }}</v-card-subtitle>

              <v-card-text class="text--primary" style="height: 50px;">
                <div></div>
                <div>{{ post.description }}</div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions class="text-center mb-1">
                <v-btn color="green" text rounded min-width="100" max-width="150" outlined> 
                  <v-icon>mdi-thumb-up-outline</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" text rounded min-width="100" max-width="150" outlined>
                  <v-icon>mdi-comment-multiple-outline</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" text rounded min-width="100" max-width="150" outlined>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import { fb, db } from '@/firebase'
export default {
  name: 'posts',
  data: () => ({
    user: null,
    posts: [],
    post: { image: '', title: '', user: '', description: '' }

  }),
  created() {
    if(!fb.auth().currentUser) {
      this.$router.push('/login')
    } else {
      this.user = fb.auth().currentUser
    }
  },
  firestore() {
    return {
      posts: db.collection('posts')
    }
  }
}
</script>