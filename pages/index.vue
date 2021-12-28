<template>
  <main>
    <section v-if="posts" class="w-full max-w-5xl mx-auto">
      <h1 class="title">Series</h1>
      <div id="search-wrapper" class="search-wrapper">
        <input id="search-bar" v-model="search" type="text" placeholder="Search title.." />
      </div>
      <posts post-type="series" :amount="10" :search="search" />
    </section>
  </main>
</template>

<style scoped>
#search-wrapper {
  margin-top: 20px;
  margin-bottom: 10px;
  float: right;
}

@media only screen and (max-width: 800px) {
  #search-wrapper input {
    width: 100%;
  }
  #search-wrapper {
    width: 100%;
  }
}
</style>

<script>
export default {
  async asyncData({ $content, error }) {
    let posts
    try {
      posts = await $content('series').fetch()
    } catch (e) {
      error({ message: 'Serie not found' })
    }
    return { posts }
  },
  data() {
    return {
      search: '',
    }
  },
}
</script>
