export const COLOR_MODE_FALLBACK = 'dark'

/**
 * @description
 * This function is used to get the total score of a movie or serie.
 *
 * @returns {int}
 */
export function score(post) {
  // iterate over the seen_by field and get the sum of the number after the * from the seen_by field
  let score = 0
  post.seen_by.forEach(seen => {
    score += parseInt(seen.split('*')[1])
  })
  // divide the sum by the length of the seen_by field
  score = score / post.seen_by.length

  // add the amount of scores to the score
  score += post.seen_by.length

  return score
}
