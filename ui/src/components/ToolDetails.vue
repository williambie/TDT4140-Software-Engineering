<template>
  <v-card v-if="tool">
    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col cols="2">
          <v-sheet class="pa-2 ma-2">
            <v-img class="ml_auto" :src="tool.image" maxheight="20vh"></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="4" offset="4">
          <v-sheet class="pa-2 ma-0">
            <h2>{{ tool.name }}</h2>
          </v-sheet>
          <v-sheet class="ma-2"
            ><p1 class="font-weight-bold">Beskrivelse:</p1></v-sheet
          >
          <v-sheet class="ma-2">{{ tool.description }}</v-sheet>
          <v-sheet v-if="tool.renterEmail == null" class="ma-2">
            <v-btn
              v-if="user.getLoggedIn && tool.lenderEmail != user.getUser.email"
              color="#FF5F00"
              class="mt-4"
              @click="borrowTool(route.params._id, user.getUser.email)"
              >Lån</v-btn
            >
            <RouterLink to="/signin" style="text-decoration: none">
              <v-btn
                v-if="!user.getLoggedIn"
                color="#FF5F00"
                class="mt-4"
                @click="borrowToolLogin(route.params._id, user)"
                >Lån</v-btn
              >
            </RouterLink>
          </v-sheet>

          <v-sheet
            v-if="user.getLoggedIn && tool.renterEmail !== 'Deleted'"
            class="ma-2"
          >
            <v-btn
              v-if="tool.lenderEmail == user.getUser.email"
              color="#FF2A00"
              class="mt-4"
              @click="markToolDeleted(route.params._id)"
              >Slett annonse</v-btn
            >
            <v-btn
              v-if="tool.renterEmail == user.getUser.email"
              color="#FF5F00"
              class="mt-4"
              @click="stopRental(route.params._id)"
              >Avslutt leie</v-btn
            >
          </v-sheet>

          <v-sheet class="ma-2">
            <p5
              v-if="tool.renterEmail == 'Deleted'"
              style="color: #ff5f00"
              class="font-weight-bold"
              >Annonsen er slettet</p5
            >
            <p5
              v-else-if="tool.renterEmail != null"
              style="color: #ff5f00"
              class="font-weight-bold"
              >Verktøyet er utlånt</p5
            >
          </v-sheet>
        </v-col>
        <v-sheet class="pa-2 ma-2">
          <v-card-item>Pris: {{ tool.price }}kr</v-card-item>
        </v-sheet>
      </v-row>
      <v-sheet v-if="user.getLoggedIn" class="ma-2">
        <RouterLink :to="`/editTool/${tool._id}`" style="text-decoration: none">
          <v-btn
            v-if="user.getUser.email == tool.lenderEmail"
            color="#FF5F00"
            class="mt-4"
            >Rediger</v-btn
          >
        </RouterLink>
      </v-sheet>
      <v-row class="mb-6" no-gutters>
        <v-col cols="3" offset="3">
          <v-card-text>
            <h3>Utleier:</h3>
          </v-card-text>
          <v-card-subtitle class="pt-1">
            {{ tool.lenderEmail }}
          </v-card-subtitle>
          <v-btn color="FF5F00" class="mt-4" @click="pushProfile()"
            >Gå til profil</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import swal from "sweetalert";
import { userStore } from "@/stores/user";

export default {
  data() {
    return {
      tool: [],
      route: [],
      user: [],
    };
  },
  mounted() {
    // Retrieves the route of the page. Primarily used to retrieve the id for the tool
    const route = useRoute();
    console.log(route.params);
    this.route = route;

    // Retreieves the tool from the database
    axios({
      method: "GET",
      url: "http://localhost:5050/api/tool/getTool/id/" + route.params._id,
    }).then(
      (response) => {
        console.log(response.data);
        this.tool = response.data.tool;
        console.log(this.tool.name);

        // Retrieves the user currently logged in
        const user = userStore();
        console.log(user.getUser);
        this.user = user;
      },
      (error) => {
        console.error(error);
      }
    );
  },
  methods: {
    stopRental(id) {
      const axiosConfig = {
        method: "POST",
        // TODO: Once the method of retriving userdata is available, add the users email to the url below
        url: "http://localhost:5050/api/tool/stopRental/" + id,
      };

      axios(axiosConfig)
        .then((response) => {
          if (response.data.success) {
            console.log("Response: ", response.data);
            swal({
              title: "Leieforhold avsluttet!",
              text: "Takk for at du bennytet tjenesten!",
              icon: "success",
            }).then(() => {
              this.$router.push("/");
            });
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
    borrowTool(id, email) {
      const axiosConfig = {
        method: "post",
        // TODO: Once the method of retriving userdata is available, add the users email to the url below
        url: "http://localhost:5050/api/tool/rentTool/" + id + "/" + email,
      };

      axios(axiosConfig)
        .then((response) => {
          if (response.data.success) {
            console.log("Response: ", response.data);
            swal({
              title: "Låneforespørsel sendt!",
              text: "Du vil motta en e-post med informasjon om hvordan du kan hente verktøyet.",
              icon: "success",
            }).then(() => {
              this.$router.push("/");
            });
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
    borrowToolLogin(id, user) {
      console.log(user.getRentState.rentState);
      user.setRentState(id);
      console.log(user.getRentState.rentState);
    },
    pushProfile() {
      console.log(this.tool.lenderEmail);
      this.$router.push(`/profile/${this.tool.lenderEmail}`);
    },
    markToolDeleted(id) {
      axios({
        method: "post",
        url: `http://localhost:5050/api/tool/markToolDeleted/${id}`,
      })
        .then((response) => {
          console.log(response.data);
          swal({
            title: "Assonsen har blitt slettet!",
            text: "Du vil sendes tilbake til hjemmesiden.",
            icon: "success",
          }).then(() => {
            this.$router.push("/");
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
