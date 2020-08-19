# Google Fonts Tester

This bookmarklet adds a panel with fonts selector. It allows you to instantly apply
different fonts for current webpage, so you can test fonts without editing CSS.

> ⚠ Project is no longer supported.
> Use [Snapfont][snapfont] as a replacement.

## Usage

If you want to use it in your browser, you have to copy contents of the bookmarklet and
create a new bookmark with this code as URL.

## Bookmarklet

```js
javascript:((d,s)=>{s=d.createElement("script");s.src="https://fonts-api.rencloud.workers.dev/inject.js";d.body.append(s);})(document)
```

## List of fonts

At this moment, script fetches only fonts which contain cyrillic subset.

## Environment Variables

* `CF_API_TOKEN` - Cloudflare API Token.
* `GFONTS_API_KEY` - Google Fonts API Token.
* `GFONTS_REFERRER` - Google Fonts API Token Referer.

## License

This software is licensed under MIT License.
Text of the license is available [here][license].

## Status

![.github/workflows/wrangler.yml](https://github.com/rensatsu/font-tester-worker/workflows/.github/workflows/wrangler.yml/badge.svg?branch=master&event=push)

[license]: ./LICENSE.txt
[snapfont]: https://getsnapfont.com/
