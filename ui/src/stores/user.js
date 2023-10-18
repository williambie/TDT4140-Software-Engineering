import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => {
    return {
      loggedIn: false,
      user: {},
      toolState: {
        rentState: false,
        id: null
      }
    };
  },
  getters: {
    getLoggedIn() {
      return this.loggedIn;
    },
    getUser() {
      return this.user;
    },
    getRentState() {
      return this.toolState;
    }
  },
  actions: {
    setUser(user) {
      this.user = user;
      this.loggedIn = true;
    },
    logout() {
      this.loggedIn = false;
    },
    setRentState(id){
        this.toolState.rentState = true;
        this.toolState.id = id;
    },
    resetRentState(){
        this.toolState.rentState = false;
        this.toolState.id = null;
    }
  },
});
