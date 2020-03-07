# Google Fonts Tester

This bookmarklet adds a panel with fonts selector. It allows you to instantly apply
different fonts for current webpage, so you can test fonts without editing CSS.

## Usage

If you want to use it in your browser, you have to copy contents of the bookmarklet and
create a new bookmark with this code as URL.

## List of fonts

At this moment, script fetches only fonts which contain cyrillic subset.

## Bookmarklet

```js
javascript:((d,s)=>{s=d.createElement("script");s.src="https://fonts-api.rencloud.workers.dev/inject.js";d.body.append(s);})(document)
```

## Worker Environment Variables

* CF_API_TOKEN - Cloudflare API Token.
* GFONTS_API_KEY - Google Fonts API Token.
* GFONTS_REFERRER - Google Fonts API Token Referer.

## Status

![.github/workflows/wrangler.yml](https://github.com/rensatsu/font-tester-worker/workflows/.github/workflows/wrangler.yml/badge.svg?branch=master&event=push)
