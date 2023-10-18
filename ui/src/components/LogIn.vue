<template>
  <v-sheet width="300" class="mx-auto mt-10">
    <v-form @submit.prevent="submitForm">
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
        :rules="[(v) => (v && 7 < v.length) || 'Password must be at least 8 characters',
                 (v) => (v && 33 > v.length) || 'Password must be shorter than 33 characters']"
        label="Password"
        type="password"
        id="password"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">Log in</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";
import {userStore} from "@/stores/user";
const user = userStore();

const email = ref("");
const password = ref("");

const submitForm = () => {
  const formData = {
    email: email.value,
    password: password.value,
  };

  const axiosConfig = {
    method: "post",
    url: "http://localhost:5050/api/user/signIn",
    data: formData,
  };

  axios(axiosConfig)
    .then((response) => {
      if (response.data.success) {
        user.setUser(response.data.user);
        console.log("Response: ", response.data);
        //console.log(user.getRentState.rentState);
        if(user.getRentState.rentState) {
          router.push('/toolDetails/'+user.getRentState.id);
        }
        else {
          router.push({ name: "home" }); 
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not found",
        width: "300px",
        heightAuto: "70px",
      });
    });
};
</script>

<style scoped></style>
