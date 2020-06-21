<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Pencil-SPA</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!loggedIn">
          <router-link class="btn btn-primary my-1 btn-block" to="/login"
            >Login</router-link
          >
        </li>
        <li class="nav-item" v-if="loggedIn">
          <router-link class="btn btn-primary btn-block" to="/dashboard"
            >Dashboard</router-link
          >
        </li>
        <li class="nav-item" v-if="loggedIn">
          <router-link
            class="btn btn-success ml-2 btn-block"
            to="/add"
            tabindex="-1"
            aria-disabled="true"
            >Add News</router-link
          >
        </li>
        <li class="nav-item" v-if="loggedIn">
          <button
            class="btn btn-warning ml-3 btn-block"
            @click.prevent="performLogout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      token: null
    };
  },
  mounted() {
    this.checkUserStatus();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    }
  },
  methods: {
    checkUserStatus() {
      if (localStorage.getItem("token") != null) {
        this.token = localStorage.getItem("token");
      }
    },
    performLogout() {
      this.$store
        .dispatch("performLogoutAction")
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
