<template>
  <v-sheet width="300" class="mx-auto mt-10">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="toolField"
        :rules="[
          (v) => !!v || 'Field is required',
          (v) => (v && v.length > 1) || 'Name must be at least 2 characters',
          (v) => (v && v.length < 33) || 'Name must be less than 33 characters',
        ]"
        label="Tool Name"
        type="text"
        id="toolField"
        required
      ></v-text-field>
      <v-text-field
        v-model="priceField"
        :rules="[
          (v) => !!v || 'Field is required',
          (v) => v >= 0 || 'Price must be greater than or equal to 0',
        ]"
        label="Price"
        type="number"
        id="priceField"
      ></v-text-field>

      <v-select
        v-model="categoryField"
        label="Category"
        :items="[
          'Hagearbeid',
          'Kjøkkenredskaper',
          'Rengjøring',
          'Baderom',
          'Garasjen',
          'Bil',
        ]"
        :rules="[(v) => !!v || 'Field is required']"
        clearable
      ></v-select>

      <v-text-field
        v-model="descriptionField"
        :rules="[
          (v) => !!v || 'Field is required',
          (v) =>
            (v && v.length > 1) || 'Description must be at least 2 characters',
          (v) =>
            (v && v.length < 101) ||
            'Description must be less than 33 characters',
        ]"
        label="Description"
        type="text"
        id="descriptionField"
      ></v-text-field>
      <v-file-input
        max-size="50"
        label="Upload picture"
        prepend-icon="mdi-camera"
        id="imageField"
      ></v-file-input>
      <span v-if="!user.getLoggedIn" style="color:#FF5F00"><p class="text-center">Log in to register tool</p></span>
      <v-btn type="submit" block class="mt-2" v-if="user.getLoggedIn">Register</v-btn>

      <RouterLink to="/signin" style="text-decoration: none">
        <v-btn v-if="!user.getLoggedIn" block class="mt-2">Register</v-btn>
      </RouterLink>
    </v-form>
  </v-sheet>
  
  <img :src="buffer" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";
import { userStore } from "@/stores/user";

const user = userStore();
const toolField = ref("");
const priceField = ref("");
const categoryField = ref("");
const descriptionField = ref("");

const submitForm = () => {
  const reader = new FileReader();
  let imageUrl;
  // Set up onload callback to handle file contents
  reader.onload = function (event) {
    imageUrl = event.target.result;
    const formData = {
      name: toolField.value,
      price: priceField.value,
      category: categoryField.value,
      description: descriptionField.value,
      image: imageUrl,
      lenderEmail: user.getUser.email,
    };
    console.log(formData);
    console.log(document.getElementById("imageField").files[0].name);
    const axiosConfig = {
      method: "post",
      url: "http://localhost:5050/api/tool/regTool",
      data: formData,
    };

    axios(axiosConfig)
      .then((response) => {
        if (response.data.success) {
          console.log("Response: ", response.data);
          swal.fire({
            icon: "success",
            title: "Congratulation",
            text: "You have successfully registered your tool!",
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

  // Read file as ArrayBuffer (which can be converted to a Buffer object if needed)
  reader.readAsDataURL(document.getElementById("imageField").files[0]);
};
</script>
