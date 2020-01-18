<template>
  <div id="login">

    <v-expansion-panels focusable popout flat>

      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold display-1" color="green--text">Register</v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content>
          <v-card flat max-width="800" class="mx-auto mt-4 green--text" >
            <v-divider></v-divider>
              <v-form class="mx-auto">

                <v-text-field v-model="name" color="green" label="Name" append-icon="mdi-account" :rules="nameRules" outlined></v-text-field>
                <v-text-field v-model="email" color="green" label="Email" type="email" append-icon="mdi-email" :rules="emailRules" outlined></v-text-field>
                <v-select v-model="gender" color="green" :items="items" label="Gender" :rules="genderRules" outlined></v-select>

                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field color="green" v-model="date" label="Birthday" append-icon="mdi-calendar" readonly v-on="on" :rules="dobRules" outlined></v-text-field>
                  </template>
                  <v-date-picker v-model="date" color="green" @input="menu2 = false"></v-date-picker>
                </v-menu>

                <v-text-field v-model="contact" color="green" label="Contact No." append-icon="mdi-contacts" :rules="contactRules" type="number" counter="10" outlined></v-text-field>

                <v-text-field v-model="pass1" color="green" label="Enter Password" @click:append="showPass1 = !showPass1" :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'" :type="showPass1 ? 'text' : 'password'" :rules="passwordRules" outlined></v-text-field>
                <v-text-field v-model="pass2" color="green" label="Confirm Password" :type="showPass1 ? 'text' : 'password'" outlined></v-text-field>

                <v-card-actions class="mx-0 pa-0">
                    <v-btn class="mx-auto" color="green" dark large outlined rounded width="50%" @click="register" :loading="loadr">Register</v-btn>
                </v-card-actions>

                </v-form>
            </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>


      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-bold display-1" color="green--text">Sign In</v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content>
            <v-card flat max-width="800" class="mx-auto mt-4 green--text">
              <v-form class="mx-auto" v-model="validl">

                <v-text-field v-model="email1" color="green" label="Email" type="email" append-icon="mdi-email" :rules="emailRules" outlined></v-text-field>
                <v-text-field v-model="password" color="green" label="Enter Password" @click:append="showPass = !showPass" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :type="showPass ? 'text' : 'password'" outlined></v-text-field>

                <v-card-actions class="mx-0 pa-0">
                  <v-btn class="mx-auto" :disabled="!validl" color="green" dark  outlined large rounded width="50%" @click="login" :loading="loadl">Login</v-btn>
                </v-card-actions>

              </v-form>
            </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-snackbar v-model="snackbar" :timeout="3000" top>{{ text }}</v-snackbar>

  </div>
</template>


<script>
import { fb, db } from '@/firebase'
export default {
  name: 'login',

  data: () => ({
    loadl: false,
    loadr: false,
    validl: false,
    name: '',

    //gender
    items: ['Male', 'Female', 'Other'],
    gender: '',

    //for date picker
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,

    contact: null,
    email: '',

    pass1: '',
    pass2: '',

    //login
    email1: '', 
    password: '',

    //validation rules
    nameRules: [
      v => !!v || 'Name is required', 
      v => (v && v.length >= 5) || 'Name must be 5+ character' 
    ],
    emailRules: [ 
      v => !!v || 'Email is required', 
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid' 
    ],
    dobRules: [
      v => !!v || 'Date of birth is required',
    ],
    genderRules: [
      v => !!v || 'Gender is required',
    ],
    contactRules: [
      v => !!v || 'Contact is required',
      v => (v && v.length == 10) || 'Invalid Contact Number',
    ],
    passwordRules: [
      v => !!v || 'Password is required', 
      v => (v && v.length >= 5) || 'Password must have 5+ characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
      v => /(?=.*\d)/.test(v) || 'Must have one number', 
      v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
    ],

    showPass1: false,
    showPass: false,

    snackbar: false,
    text: '',



  }),

  methods: {
    
    register() {
      if(this.pass1 == this.pass2) {
        this.loadr = true
        fb.auth().createUserWithEmailAndPassword(this.email, this.pass1)
        .then( () => {
          var user = fb.auth().currentUser
          var sd = {
            name : this.name,
            email : this.email,
            gender: this.gender,
            dob: this.date,
            contact: this.contact,
            password: this.pass1,
            userID : user.uid,
            type: 'User',
            created_at: new Date().toISOString().substr(0, 10),
            updated_at: new Date().toISOString().substr(0, 10),
          }

          db.collection('users').add(sd);
          
          if(user) {
            user.updateProfile({
              displayName: this.name,
            }).then( () => {
              this.snackbar = true
              this.text = 'User registred and logged in successfully!'
            })
          }
          this.loadr = false
          this.$router.push('/')
        })
      } else {
        this.snackbar = true
        this.text = 'Password shoulb be same'
      }
    },
    login() {
      this.loadl = true
      fb.auth().signInWithEmailAndPassword(this.email1, this.password).then( () => {
        this.loadl = false
        this.snackbar = true
        this.text = 'User logged in successfully!'
        this.$router.push('/')
      }).catch( () => {
        this.loadl = false
        this.snackbar = true
        this.text = 'Invalid E-mail/Password...Please retry'
      })
    }
  }
};
</script>