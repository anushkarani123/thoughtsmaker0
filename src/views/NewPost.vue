<template>
  <div id="newpost">

    <v-container fluid>
      <v-card flat max-width="800" class="mx-auto green--text">
        <v-card-title primary-title class="ml-0 pl-0">
          <h4>Crate New Blog</h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-form class="mx-auto" ref="form">
          <v-text-field v-model="title" color="green" label="Title" :rules="[v => !!v || 'Title is required', v => (v && v.length >= 10) || 'Title must have 10+ characters']" outlined></v-text-field>
          <!--<v-text-field v-model="image" color="green" label="Image URL" outlined></v-text-field>-->
          <input type="file" @change="uploadImage" style="margin-bottom: 10px;">
          <v-textarea v-model="description" color="green" label="Post Description" :rules="[v => !!v || 'Description is required', v => (v && v.length >= 20) || 'Description must have 20+ characters']" outlined></v-textarea>

          <v-card-actions class="mx-0 pa-0">
            <v-btn color="green" dark tile outlined large block @click="postBlog">Post</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
    <v-snackbar :timeout="3000" top v-model="snackbar">{{ text }}</v-snackbar>
  </div>
</template>

<script>
import { fb, db } from '@/firebase'
export default {
  name: 'newpost',
  data: () => ({
    user: null,

    title: '',
    image: '', 
    description: '',

    posts: [],
    snackbar: false,
    text: '',
  }),
  firestore() {
    return {
      posts: db.collection('posts')
    }
  },
  created() {
    if(!fb.auth().currentUser) {
      this.$router.push('/login')
    } else {
      this.user = fb.auth().currentUser
    }
  },
  methods: {
    uploadImage(e) {
      let file = e.target.files[0]
      var storageRef = fb.storage().ref('posts/'+file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on('state_changed', (snapshot) =>{
        // eslint-disable-next-line no-console
        console.log(snapshot)
      }, (error) => {
        // eslint-disable-next-line no-console
        console.log(error.message)
      }, () => {
        
        uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL) => {
          this.image = downloadURL
          // eslint-disable-next-line no-console
          console.log("Uploaded image ", downloadURL)
        });
      });
    },

    postBlog() {
      if(this.title && this.image && this.description)  {
        var post = {
          title: this.title,
          image: this.image,
          description: this.description,
          user: fb.auth().currentUser.displayName,
          userID: fb.auth().currentUser.uid,
          created_at: new Date().toISOString().substr(0, 10),
          updated_at: new Date().toISOString().substr(0, 10),
        }

        this.$firestore.posts.add(post)

        this.snackbar = true
        this.text = 'Post uploaded'
        this.$refs.form.reset()

      } else {
        alert('ruk bsdk')
      }
    }
  }
}
</script>