<template>
  <main>
    <section v-if="post">
      <nav class="mb-8" aria-label="go back">
        <router-back class="block" />
      </nav>

      <article>
        <img v-if="post.cover" class="cover-image" :src="post.cover" />
        <!-- <h6 class="inline py-1 px-2 mr-1 bg-gray text-white text-sm font-medium rounded-sm">{{ post.category }}</h6> -->
        <h2>{{ post.title }}</h2>
        <p style="margin-bottom: 0.5rem">
          <em>Created {{ post.dateStr }}</em>
        </p>
        <nuxt-content :document="post" />
        <p><a class="link-to-wiki" :href="'https://www.imdb.com/title/' + post.id">Read more &RightArrow;</a></p>
        <h3>Genres</h3>
      </article>
    </section>
  </main>
</template>

<style scoped></style>

<script>
export default {
  async asyncData({ $content, params, error }) {
    let post
    try {
      post = await $content('series', params.project).fetch()
    } catch (e) {
      error({ message: 'Series not found' })
    }
    return { post }
  },
}
</script>
