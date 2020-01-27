const GFONTS_API_KEY = '***'
const CACHE_TTL = 1 * 24 * 3600
const GFONTS_REFERRER = 'https://***/'

const VERSION = 2
const GIST_ID = '***'
const INJECT_SCRIPT_URL = `https://gist.githubusercontent.com/${GIST_ID}/***.js?v=${VERSION}`
const GITHUB_URL = `https://gist.github.com/${GIST_ID}/`

module.exports = {
  GFONTS_API_KEY,
  CACHE_TTL,
  GFONTS_REFERRER,
  VERSION,
  GIST_ID,
  INJECT_SCRIPT_URL,
  GITHUB_URL,
}
