<template>
  <div class="add">
    <div class>
      <div class="col-md-6 offset-md-3">
        <h2 class="display-4 text-center mt-5">Add News Form</h2>

        <form action="#">
          <div class="form-group">
            <label for="name">Title</label>
            <input
              type="text"
              name="title"
              id="Title"
              v-model="title"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="password">Body</label>
            <textarea
              name="body"
              id="Body"
              v-model="body"
              class="form-control"
            />
            <div style="color:red;" v-if="error">{{ error }}</div>
          </div>

          <div class="form-group">
            <button
              type="submit"
              class="btn btn-info btn-block"
              @click.prevent="performUpdate"
            >
              Update
            </button>
          </div>
        </form>
        <circle-spin v-show="isLoading"></circle-spin>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "update",
  data() {
    return {
      id: this.$route.params.id,
      title: this.$route.params.title,
      body: this.$route.params.body,
      error: "",
      isLoading: false
    };
  },
  methods: {
    performUpdate() {
      this.isLoading = true;
      this.$store
        .dispatch("updateNewAction", {
          id: this.id,
          title: this.title,
          body: this.body
        })
        .then(() => {
          this.isLoading = false;
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.isLoading = false;
          this.error = " There was error during updating process";
          console.log(err.message);
        });
    }
  }
};
</script>

<style></style>
