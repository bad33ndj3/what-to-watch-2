<template>
  <main>
    <section v-if="post">
      <nav class="mb-8" aria-label="go back">
        <router-back class="block" />
      </nav>

      <article>
        <img v-if="post.cover" class="cover-image" :src="post.cover" />
        <!-- <h6 class="inline py-1 px-2 mr-1 bg-gray text-white text-sm font-medium rounded-sm">{{ post.category }}</h6> -->
        <div>
          <h2>
            {{ post.title }}
            <h5>
              <a style="float: right" class="link-to-wiki imdb-btn" :href="'https://www.imdb.com/title/' + post.id"
                >IMDb</a
              >
            </h5>
          </h2>
          {{ post.description }}
        </div>
        <nuxt-content :document="post" />
        <table>
          <tr>
            <td>Kind:</td>
            <b
              ><i
                ><td>{{ post.kind }}</td></i
              ></b
            >
          </tr>
          <tr>
            <td>Main Category:&nbsp;&nbsp;</td>
            <b
              ><i
                ><td></td>
                <td>{{ post.category }}</td></i
              ></b
            >
          </tr>
          <tr>
            <td>Sub Category:&nbsp;&nbsp;</td>
            <b
              ><i
                ><td></td>
                <td>{{ post.sub_category }}</td></i
              ></b
            >
          </tr>
          <tr>
            <td>Score:</td>
            <b
              ><i
                ><td></td>
                <td>{{ score(post) }}/10</td></i
              ></b
            >
          </tr>
        </table>

        <br />
        <h3>Seen by</h3>
        <ul>
          <li v-for="seen in post.seen_by" :key="seen">- {{ scoreStar(seen) }}</li>
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
    },
    scoreStar(seen) {
      let splitSeen = seen.split('*')
      return splitSeen[0] + '(★ ' + parseInt(splitSeen[1]) + ')'
    },
  },
}
</script>
