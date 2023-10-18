<template>
  <div>
    <v-toolbar color="#FF5F00">
      <v-icon icon="mdi-hammer-wrench" size="large" class="ma-4" style="color: black"></v-icon>
      <RouterLink to="/" style="text-decoration: none"> 
        <v-toolbar-title style="color: black" class="text-h5">Tool Time</v-toolbar-title>
      </RouterLink>

      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" color="black">
        
        <v-icon v-if="theme.global.current.value.dark" icon="mdi-weather-sunny" size="large"></v-icon>
        <v-icon v-if="!theme.global.current.value.dark" icon="mdi-weather-night" size="large"></v-icon>
                
      </v-btn>
      <RouterLink to="/signin" style="text-decoration: none">
        <v-btn v-if="!user.getLoggedIn" flat value="signin" color="black"
          >Log in</v-btn
        >
      </RouterLink>
      <RouterLink to="/signup" style="text-decoration: none">
        <v-btn v-if="!user.getLoggedIn" flat value="signup" color="black"
          >Sign up</v-btn
        >
      </RouterLink>
      <RouterLink to="/profile" style="text-decoration: none">
        <v-btn v-if="user.getLoggedIn" flat value="signup" color="black"
          >Profile</v-btn
        >
      </RouterLink>
      <RouterLink to="/regTool" style="text-decoration: none">
        <v-btn flat value="regTool" color="black">Register Tool</v-btn>
      </RouterLink>
      <RouterLink to="/" style="text-decoration: none">
        <v-btn
          flat
          value="logOut"
          color="black"
          v-if="user.getLoggedIn"
          @click="user.$reset()"
          >Log Out</v-btn
        ></RouterLink
      >
    </v-toolbar>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { userStore } from "@/stores/user";
const user = userStore();

    const theme = useTheme()
    
    console.log(theme)

    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark ? 'puLightMode' : 'puDarkMode'
    }

</script>

<style scoped></style>
