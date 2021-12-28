<template>
  <ul v-if="amount > 0" class="cards">
    <li v-for="(post, index) in filteredPosts" :key="index">
      <nuxt-link :to="`/${post.slug}`" class="card card--clickable">
        <template v-if="post.cover">
          <span class="flex-1">
            <h3 class="card-title">{{ post.title }} (★ {{ score(post) }})</h3>
            <img v-if="post.cover" class="cover-image" :src="post.cover" />
            <h6 class="inline-block py-1 px-2 mr-1 mt-2 kind text-white text-sm font-medium rounded-sm">
              {{ post.kind }}
            </h6>
            <h6 class="inline-block py-1 px-2 mr-1 mt-2 category text-white text-sm font-medium rounded-sm">
              {{ post.category }}
            </h6>
            <h6 class="inline-block py-1 px-2 mr-1 mt-2 category text-white text-sm font-medium rounded-sm">
              {{ post.sub_category }}
            </h6>
          </span>
        </template>

        <template v-else>
          <span class="w-full">
            <span class="flex justify-between align-baseline">
              <h3 class="card-title">{{ post.title }}</h3>
            </span>
            <p class="mt-2">{{ post.description }}</p>
          </span>
        </template>
      </nuxt-link>
    </li>
  </ul>
  <div v-else-if="loading" class="cards">
    <div v-for="placeholder in placeholderClasses" :key="placeholder.id" class="card">
      <content-placeholders :rounded="true" :class="placeholder">
        <content-placeholders-heading />
      </content-placeholders>
    </div>
  </div>
  <p v-else class="max-w-5xl mx-auto">
    {{ amount > 1 ? 'Posts not found' : 'Post not found' }}
  </p>
</template>

<script>
import { score } from '~/utils/globals.js'

export default {
  name: 'Posts',
  props: {
    postType: {
      type: String,
      default: 'serie',
      validator: (val) => ['series'].includes(val),
    },
    amount: {
      // ? https://content.nuxtjs.org/fetching#limitn
      type: Number,
      default: 10,
      validator: (val) => val >= 0 && val < 100,
    },
    sortBy: {
      // ? https://content.nuxtjs.org/fetching#sortbykey-direction
      type: Object,
      default: () => ({
        key: 'slug',
        direction: 'desc', // you probably want 'asc' here
      }),
      validator: (obj) => typeof obj.key === 'string' && typeof obj.direction === 'string',
    },
    search: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      posts: [],
      loading: true,
    }
  },
  computed: {
    placeholderClasses() {
      const classes = ['w-full', 'w-2/3', 'w-5/6']
      return [...Array.from({ length: this.amount }, (v, i) => classes[i % classes.length])] // repeats classes after one another
    },
    filteredPosts() {
      return this.posts.filter((post) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  async mounted() {
    this.loading = true
    this.posts = await this.fetchPosts()
    this.posts = this.posts.sort((a, b) => {
      return this.score(b) - this.score(a)
    })
    this.loading = false
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(process.env.lang) || ''
    },
    async fetchPosts(postType = this.postType, amount = this.amount, sortBy = this.sortBy) {
      return this.$content(postType)
        .sortBy(sortBy.key, sortBy.direction)
        .limit(amount)
        .fetch()
        .catch((err) => console.error(err) || [])
    },
    score(post) {
      return score(post)
    },
  },
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

@media only screen and (max-width: 650px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

@media only screen and (max-width: 800px) and (min-width: 650px) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 800px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.cards .card {
  flex-direction: column;
  box-shadow: 2px 5px 8px 2px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  border: 0;
}
.cards .card .cover-image {
  margin: 0;
  width: 100%;
  max-height: 800px;
}
.cards li {
  margin-top: 0;
}

.kind {
  background-color: rgb(182, 182, 15);
}

.category {
  background-color: rgb(169, 76, 192);
}
</style>
