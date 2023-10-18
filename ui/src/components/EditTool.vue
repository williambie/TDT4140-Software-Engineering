<template>
  <v-sheet width="300" class="mx-auto mt-10">
    <v-form @submit.prevent="submitForm">
      <v-text-field
        v-model="toolField"
        :rules="[(v) => !!v || 'Field is required',
                 (v) => (v && v.length > 1) || 'Name must be at least 2 characters',
                 (v) => (v && v.length < 33) || 'Name must be less than 33 characters']"
        label="Tool Name"
        type="text"
        id="toolField"
        required
      ></v-text-field>
      <v-text-field
        v-model="priceField"
        :rules="[(v) => !!v || 'Field is required']"
        label="Price"
        type="number"
        id="priceField"
      ></v-text-field>
      <v-select
        v-model="categoryField"
        label="Category"
        id="categoryField"
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
        :rules="[(v) => !!v || 'Field is required',
                 (v) => (v && v.length > 1) || 'Description must be at least 2 characters',
                 (v) => (v && v.length < 101) || 'Description must be less than 33 characters']"
        label="Description"
        type="text"
        id="descriptionField"
      ></v-text-field>
      <v-file-input
        max-size="50"
        label="Upload picture"
        prepend-icon="mdi-camera"
        id="imageField"
        @input="readImage()"
      ></v-file-input>
      <v-btn type="submit" block class="mt-2">Edit</v-btn>
    </v-form>
  </v-sheet>
  <img :src="buffer">
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "@/router";
import { useRoute } from 'vue-router';
import swal from "sweetalert2";

const tool = ref(null);
const route = ref(null);
const toolField = ref("");
const priceField = ref("");
const categoryField = ref("");
const descriptionField = ref("");
const formData = ref(null);
const imageUrl = ref(null);

onMounted(() => {
  route.value = useRoute();
  axios({ method: "GET", "url": "http://localhost:5050/api/tool/getTool/id/"+route.value.params._id }).then(response => {
    console.log(response.data);
    tool.value = response.data.tool
    toolField.value = tool.value.name;
    priceField.value = tool.value.price;
    categoryField.value = tool.value.category;
    descriptionField.value = tool.value.description;
  })
});

const readImage = () => {
  const reader = new FileReader();

  reader.onload = function(event) {
    imageUrl.value = event.target.result;
    console.log(imageUrl.value);
  }
  reader.readAsDataURL(document.getElementById("imageField").files[0]);
}

const submitForm = () => {
  // If an image is added to the field, use it. Otherwise, use the old picture
  if (document.getElementById("imageField").files[0] != undefined) {
    formData.value = {
      name: toolField.value,
      price: priceField.value,
      category: categoryField.value,
      description: descriptionField.value,
      image: imageUrl.value,
    };
  } else {
    formData.value = {
      name: toolField.value,
      price: priceField.value,
      category: categoryField.value,
      description: descriptionField.value,
    }
  }

  console.log(formData.value);
  const axiosConfig = {
    method: "post",
    url: "http://localhost:5050/api/tool/editTool/"+route.value.params._id,
    data: formData.value,
  };

  axios(axiosConfig)
    .then((response) => {
      if (response.data.success) {
        console.log("Response: ", response.data);
        swal.fire({
          icon: "success",
          title: "Congratulation",
          text: "You have successfully edited your tool!",
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

