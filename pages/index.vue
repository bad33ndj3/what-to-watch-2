<template>
  <main>
    <section v-if="posts" class="w-full max-w-5xl mx-auto">
      <h1 class="title">Series</h1>
      <posts post-type="series" :amount="10" />
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
}
</script>
