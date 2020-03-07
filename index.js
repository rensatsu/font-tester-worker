const Constants = require('./constants');
const injectScript = require('raw-loader!./bookmarklet/inject.js');

const CACHE_TTL = 1 * 24 * 3600;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const GFONTS_API_KEY = Constants.GFONTS_API_KEY;
const GFONTS_REFERRER = Constants.GFONTS_REFERRER;

const GITHUB_URL = `https://github.com/rensatsu/font-tester-worker`;

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

function errorResponse(code = 404, text = 'Not found') {
  const response = new Response(text, {
    status: code >= 200 && code <= 599 ? code : 500,
  });

  response.headers.set('Content-Type', 'text/plain');

  addCors(response);

  return response;
}

function addCors(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
}

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

async function handleGetDebug() {
  const jsonResp = {
    build: 'GIT_COMMIT' in Constants ? Constants.GIT_COMMIT : null,
    home: GITHUB_URL,
  };

  const response = new Response(JSON.stringify(jsonResp), { status: 200 });
  response.headers.set('Content-Type', 'application/json');
  return response;
}

function handleGetInfo() {
  const response = new Response('Redirecting', { status: 302 });
  response.headers.set('Location', GITHUB_URL);

  return response;
}

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
