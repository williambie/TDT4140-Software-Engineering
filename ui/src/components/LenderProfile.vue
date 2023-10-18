<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar size="150" class="mx-auto mb-3">
            <img
              style="width: 150px; height: 150px"
              src="../assets/profile.png"
            />
          </v-avatar>
        </v-col>
        <v-col cols="12" md="8">
          <h1 class="text-center mb-3">
            {{ userData.firstName }} {{ userData.lastName }}
          </h1>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>
                  <v-icon left>mdi-email</v-icon>
                  <span>Email</span>
                </v-card-title>
                <v-card-text>
                  {{ userData.email }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>
                  <v-icon left>mdi-phone</v-icon>
                  <span>Phone</span>
                </v-card-title>
                <v-card-text>
                  {{ userData.phone }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  
    <v-card>
      <v-tabs v-model="tab">
        <v-tab class="v-tabs__item" :value="1">Annonser</v-tab>
        <v-tab class="v-tabs__item" :value="2">Vurderinger</v-tab>
      </v-tabs>
      <v-card>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="tool in tools"
                  :key="tool.id"
                  cols="12"
                  xs="12"
                  sm="6"
                  md="4"
                  lg="4"
                  xl="4"
                >
                  <v-card>
                    <v-img :src="tool.image" height="200"></v-img>
                    <v-card-title>{{ tool.name }}</v-card-title>
                    <v-card-text>Pris: {{ tool.price }}kr</v-card-text>
                    <v-card-text>{{ tool.description }}</v-card-text>
                    <v-card-actions>
                      <v-col>
                        <RouterLink
                          :to="`/toolDetails/${tool._id}`"
                          style="text-decoration: none"
                        >
                          <v-btn
                            color="#FF5F00"
                            @click="router.push(`/toolDetails/${tool._id}`)"
                            text
                            >Detaljer</v-btn
                          >
                        </RouterLink>
                      </v-col>
  
                      <v-col class="text-right">
                        <v-card-text
                          v-if="tool.renterEmail !== null"
                          class="font-weight-bold"
                          style="color: #ff5f00"
                          >Verktøy er utleid</v-card-text
                        >
                      </v-col>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
          <v-window-item :value="2">
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="4">
                  <h1>Hello</h1>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card>
    </v-card>
  </template>
  
  <script>
  import axios from "axios";
  import {useRoute} from "vue-router";
  
  export default {
    data() {
      return {
        userData: [],
        tools: [],
        tab: null,
      };
    },
    mounted() {
        const route = useRoute();   
        this.route = route;
        axios({
        method: "GET",
        url: `http://localhost:5050/api/user/getUser/email/${route.params.email}`,
        }).then((response) => {
            console.log("this is the response data")
            console.log(response.data.user);
            console.log("this is the response data");
            this.userData = response.data.user;
        }).catch((error) => {
            console.error(error);
        });
  
      axios({
        method: "GET",
        url: `http://localhost:5050/api/tool/getTool/filter/lenderEmail/match/${route.params.email}`,
      })
        .then((response) => {
          console.log(response.data);
          this.tools = response.data.tools;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
  </script>
  
  <style>
  h1 {
    font-size: 32px;
    font-weight: bold;
  }
  
  v-card {
    margin-bottom: 20px;
  }
  
  .v-tabs__item {
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  </style>
  