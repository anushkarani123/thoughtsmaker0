<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card flat max-width="800" class="text-center mx-auto">
      <v-card-text>
          
        <v-avatar size="300">
          <v-img  src="@/assets/tm.png" class="text-center">
            <v-btn class="mx-auto my-auto" style="top: 120px;" fab dark color="green">
              <v-icon dark>mdi-camera</v-icon>
            </v-btn>
          </v-img>
          <!--<v-img  :src="user.photoURL" class="text-center">
            <v-btn class="mx-auto my-auto" style="top: 120px;" fab dark color="green">
              <v-icon dark>mdi-camera</v-icon>
            </v-btn>
          </v-img>-->
        </v-avatar>
        <!--<input type="file" @change="updateImage">-->
        <v-text-field v-model="profile.name" color="green" label="Name" disabled></v-text-field>
        <v-select v-model="profile.gender" color="green" :items="items" label="Gender" disabled dense></v-select>
          

        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field color="green" disabled v-model="profile.date" label="Birthday" append-icon="mdi-calendar" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="profile.date" color="green" @input="menu2 = false"></v-date-picker>
        </v-menu>

        <v-text-field v-model="profile.contact" disabled color="green" label="Contact No."></v-text-field>
        <v-text-field v-model="profile.email" disabled color="green" label="Email Address"></v-text-field>

      </v-card-text>
      <!--<v-card-actions class="mx-auto">
        <v-btn color="green" class="mx-auto" dark rounded large width="50%" @click="updateUser">Save Changes</v-btn>
      </v-card-actions>-->

    </v-card>
  </v-container>
</template>

<script>
import { fb, db } from '@/firebase'
export default {
  name: 'profile',

  data: () => ({
    user: null,

    //gender
    items: ['Male', 'Female', 'Other'],

    //for date picker
    menu: false,
    modal: false,
    menu2: false,

    profile: {}

  }),
 
  created() {
    if(!fb.auth().currentUser) {
      this.$router.push('/login')
    } else {
      this.user = fb.auth().currentUser
      this.getUser();
    }
  },
  
  methods: {
    getUser() {
      db.collection("users").where("userID", "==", this.user.uid).get().then( (querySnapshot) => {
        querySnapshot.forEach( (doc) => {
          this.profile = {
            name: doc.data().name,
            gender: doc.data().gender,
            date: doc.data().dob,
            contact: doc.data().contact,
            email: doc.data().email
          }
        });
      })
    },

    /*updateUser() {
      var user = fb.auth().currentUser;
      user.updateProfile({
        displayName: this.profile.name,
        email: this.profile.email
      })
    }*/

    /*updateImage(e) {
      let file = e.target.files[0];
      var user = fb.auth().currentUser;
      user.updateProfile({
        photoURL: file.name
      })

    },*/
  }
};
</script>