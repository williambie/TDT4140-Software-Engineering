<template>

    <div>
  
      <form class="login-form" @submit.prevent="submitForm">
  
        <label for="firstName">First name:</label>
  
        <input type="text" id="firstName" v-model="firstName" required>
  
        <br>

        <label for="lastName">Last name:</label>
  
        <input type="text" id="lastName" v-model="lastName" required>
  
        <br>
  
        <label for="email">Email:</label>
  
        <input type="email" id="email" v-model="email" required>
  
        <br>
        <label for="password">Password:</label>
  
        <input type="password" id="password" v-model="password" required>
  
        <br>
  
        <label for="phone">Phone:</label>
  
        <input type="tel" id="phone" v-model="phone" required>
  
        <br>
  
  
        <button type="submit">Login</button>
  
      </form>
  
    </div>
  
  </template>
  
   
  
  <script>
  const axios = require("axios");
  export default {
  
    data() {
  
      return {
  
        firstName: '',

        lastName: '',
  
        email: '',
  
        password: '',

        phone: ''
  
      }
  
    },
  
    methods: {
  
      submitForm() {
  
        // Submit login form to server
  
        const formData = {
  
          firstName: this.firstName,

          lastName: this.lastName,
  
          email: this.email,
  
          password: this.password,
          
          phone: this.phone
  
        };
        console.log("Test1");
        const axiosConfig = {
          method: "get",
          url: "http://localhost:5050/api/users/63ef3163f5a075d43ce0aa07",
          //data: formData
        };
        console.log("Test2");
         axios(axiosConfig)
          .then(response => {
            console.log("Response: ", response.data);
          })
          .catch(error => {
            console.error("Error: ", error);
          })

        // Call API to authenticate user
        console.log("Etter");
        console.log(JSON.stringify(formData, null, 2))
        // Handle response from server
      },
    }
  }
  
  </script>