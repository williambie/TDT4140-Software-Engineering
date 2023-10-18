<template>
  <v-sheet width="300" class="mx-auto mt-10">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="firstName"
        :rules="[(v) => !!v || 'You must enter a first name']"
        label="First Name"
        type="text"
        id="firstName"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="[(v) => !!v || 'You must enter a last name']"
        label="Last Name"
        type="text"
        id="lastName"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[(v) => !!v || 'You must enter an email',
                 (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid']"
        label="Email"
        type="email"
        id="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[(v) => !!v  || 'You must enter a password', 
                 (v) => (v && v.length > 7) || 'Password must be at least 8 characters',
                 (v) => (v && v.length < 33) || 'Password must shorter than 33 characters']"
        label="Password"
        type="password"
        id="password"
      ></v-text-field>
      <v-text-field
        v-model="phone"
        :rules="[(v) => !!v || 'You must enter a phone number',
                 (v) => (v && v.length > 1) || 'Phone number too short',
                 (v) => (v && v.length < 33) || 'Phone number too long']"
        label="Phone"
        type="tel"
        id="phone"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">Sign up</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");

const submitForm = () => {
  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
  };

  const axiosConfig = {
    method: "post",
    url: "http://localhost:5050/api/user/signUp",
    data: formData,
  };

  axios(axiosConfig)
    .then((response) => {
      if (response.data.success) {
        console.log("Response: ", response.data);
        swal.fire({
          icon: "success",
          title: "Congratulation",
          text: "You have successfully signed up!",
          width: "400px",
          heightAuto: "100px",
        });
        router.push({ name: "home" });
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};
</script>
