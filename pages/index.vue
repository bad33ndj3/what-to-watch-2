<template>
  <main>
    <section v-if="posts" class="w-full max-w-5xl mx-auto">
      <h1 class="title">Series</h1>
      <div class="search-wrapper">
        <input v-model="search" type="text" placeholder="Search title.."/>
        <label>Search title:</label>
      </div>
      <posts post-type="series" :amount="10" :search='search' />
    </section>
  </main>
</template>

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
      search: "",
    }
  },
}
</script>
