export const COLOR_MODE_FALLBACK = 'dark'

export function score(post) {
  // iterate over the seen_by field and get the sum of the number after the * from the seen_by field
  let score = 0
  post.seen_by.forEach(seen => {
    score += parseInt(seen.split('*')[1])
  })
  // divide the sum by the length of the seen_by field
  return score / post.seen_by.length
}
