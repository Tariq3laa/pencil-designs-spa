<template>
  <div class="container" v-if="loggedIn">
    <div class="row">
      <div class="col">
        <h1 class="col display-4 text-center mt-3 mb-3">
          Welcome <br />
          MR: {{ user.name }}
        </h1>
      </div>
    </div>
    <div v-if="news">
      <div
        class="card mb-3"
        style="width: 28rem;"
        v-for="n in news"
        :key="n.id"
      >
        <div class="card-body">
          <h5 class="card-title">{{ n.title }}</h5>
          <p class="card-text">
            {{ n.body }}
          </p>
          <a
            @click.prevent="$store.dispatch('deleteNewAction', n.id)"
            class="btn btn-danger float-right"
            >Delete</a
          >
          <a
            @click.prevent="update(n.id, n.title, n.body)"
            class="btn btn-primary float-right mr-2"
          >
            Update
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="col display-5 text-center mt-3 mb-3">
        No News yet :(
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: this.$store.getters.get_news
    };
  },
  computed: {
    user() {
      return this.$store.getters.get_user;
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    }
  },
  methods: {
    update(id, title, body) {
      this.$router.push(`/update/${id}/${title}/${body}`);
    }
  }
};
</script>
