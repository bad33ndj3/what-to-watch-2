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
        <p><a class="link-to-wiki" :href="'https://www.imdb.com/title/' + post.id">IMDB &RightArrow;</a></p>
        <nuxt-content :document="post" />
        <p>kind: {{ post.kind }}</p>
        <p>category: {{ post.category }}</p>
        <p>sub_category: {{ post.sub_category }}</p>
        <p>score: {{ score(post) }}</p>
        <h3>Seen by</h3>
        <ul>
          <li v-for="seen in post.seen_by">- {{ seen }}</li>
        </ul>
      </article>
    </section>
  </main>
</template>

<style scoped></style>

<script>
import { score } from '~/utils/globals.js'

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
  methods: {
    score(post) {
     return score(post)
    }
  }
}
</script>
