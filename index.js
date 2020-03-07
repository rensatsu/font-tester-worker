const Constants = require('./constants');
const injectScript = require('raw-loader!./bookmarklet/inject.js');

/** @constant {string} CACHE_TTL Cache Time-To-Live */
const CACHE_TTL = 1 * 24 * 3600;

/** Register worker handler */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/** @constant {string} GFONTS_API_KEY */
const GFONTS_API_KEY = Constants.GFONTS_API_KEY;

/** @constant {string} GFONTS_REFERRER */
const GFONTS_REFERRER = Constants.GFONTS_REFERRER;

/** @constant {string} GITHUB_URL */
const GITHUB_URL = `https://github.com/rensatsu/font-tester-worker`;

/**
 * Fetch fonts list from Google Fonts.
 *
 * @returns {(object|null)} JSON list of fonts or null.
 */
async function getFontsList() {
  try {
    const apiUrl = new URL('https://www.googleapis.com/webfonts/v1/webfonts');
    apiUrl.searchParams.append('sort', 'alpha');
    apiUrl.searchParams.append('key', GFONTS_API_KEY);

    const apiHeaders = new Headers();
    apiHeaders.append('referer', GFONTS_REFERRER);

    const resp = await fetch(apiUrl, {
      headers: apiHeaders,
      cf: {
        cacheEverything: true,
        cacheTtl: CACHE_TTL,
      },
    });

    if (!resp.ok) return null;

    return await resp.json();
  } catch (e) {
    return null;
  }
}

/**
 * Generate an error response.
 *
 * @param {number} [code=404] HTTP Status Code
 * @param {string} [text='Not found'] Text of the response
 * @returns
 */
function errorResponse(code = 404, text = 'Not found') {
  const response = new Response(text, {
    status: code >= 200 && code <= 599 ? code : 500,
  });

  response.headers.set('Content-Type', 'text/plain');

  addCors(response);

  return response;
}

/**
 * Add CORS header to the response.
 *
 * @param {Response} response Response object.
 */
function addCors(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
}

/**
 * Handle request to get fonts list.
 *
 * @returns {Response} Response object.
 */
async function handleGetFonts() {
  const gFontsList = await getFontsList();

  if (!gFontsList) {
    return errorResponse(500, 'Unable to fetch fonts list');
  }

  if (!('items' in gFontsList)) {
    return errorResponse(500, 'Unable to parse fonts list');
  }

  const fonts = [];
  gFontsList.items.forEach(font => {
    if (font.subsets.includes('cyrillic')) {
      fonts.push(font.family);
    }
  });

  const jsonResp = {
    fonts: fonts,
  };

  const response = new Response(JSON.stringify(jsonResp), { status: 200 });
  response.headers.set('Content-Type', 'application/json');
  response.headers.set('Cache-Control', `max-age=${CACHE_TTL}`);
  addCors(response);
  return response;
}

/**
 * Handle request to get debug information.
 *
 * @returns {Response} Response object.
 */
async function handleGetDebug() {
  const jsonResp = {
    build: 'GIT_COMMIT' in Constants ? Constants.GIT_COMMIT : null,
    home: GITHUB_URL,
  };

  const response = new Response(JSON.stringify(jsonResp), { status: 200 });
  response.headers.set('Content-Type', 'application/json');
  return response;
}

/**
 * Handle request to get information about this app.
 *
 * @returns {Response} Response object.
 */
function handleGetInfo() {
  const response = new Response('Redirecting', { status: 302 });
  response.headers.set('Location', GITHUB_URL);

  return response;
}

/**
 * Handle request to get injector script.
 *
 * @returns {Response} Response object.
 */
async function handleGetInjectJs() {
  const gInjScript = injectScript.default;

  if (!gInjScript) {
    return errorResponse(500, '// Unable to fetch inject script');
  }

  const response = new Response(gInjScript, { status: 200 });
  response.headers.set('Content-Type', 'application/javascript');
  response.headers.set('Cache-Control', `max-age=${CACHE_TTL}`);
  addCors(response);
  return response;
}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const path = new URL(request.url).pathname.replace(/^[\/]{1}/, '');

  switch (path) {
    case '':
      return await handleGetInfo();

    case 'fonts':
      return await handleGetFonts();

    case 'inject.js':
      return await handleGetInjectJs();

    case 'debug':
      return await handleGetDebug();

    default:
      return errorResponse(404, 'Not found');
  }
}
