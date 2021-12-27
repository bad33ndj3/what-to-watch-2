# 🏗️ Boilerplate for Nuxt, Tailwind & NetlifyCMS

[![Netlify Status](https://api.netlify.com/api/v1/badges/1482b8b7-eab6-4dae-b6fa-892b1390fafa/deploy-status)](https://app.netlify.com/sites/what-to-watch-sheepduck/deploys)

## Project commands

1. 📦 Install dependencies.

```bash
npm install
```

2. 🏗 Run the project for local dev. This will start a hot-reloading server at `localhost:3000`.

```bash
npm run dev
```

3. 🌌 Build the app for server-side rendered deployment. See more about **Universal SSR** in the [Nuxt.js docs](https://nuxtjs.org/guide#server-rendered-universal-ssr-).

```bash
npm run build

# And to serve that deployment...
npm run start
```

4. ⚡️ Generate a fully pre-rendered static site. See more [in the docs](https://nuxtjs.org/guide#static-generated-pre-rendering-).

```bash
npm run generate
```

### Personalize setup

1. Copy and change the .env-file

   - `cp .env-example .env`
   - Then change the values

2. Change the value on these lines

   - `static/admin/config.yml` — `site_url` & `logo_url`
   - `content/site/info.json` — `sitename`, `sitedescription` & `sitelang`
   - `package.json` — `name`, `description`, `author` & `repository.url`
   - `pages/index.vue` — The start page of your new website!

3. Change colors, favicon, content & content collections

   - Colors are managed in `assets/scss/_vars.scss` & `tailwind.config.js`
   - Favicon is generated by [@nuxt/pwa](https://pwa.nuxtjs.org/). You should change the `static/icon.png` to something new, and then match the new filename and source in `nuxt.config.js` under `pwa.icon`. Replace the preview.jpg as well.
   - Content is managed mainly in [local Netlify CMS](http://localhost:3000/admin) by going to your `/admin`, in development mode by double-clicking on a post or by hand in `/content`
   - Content collections are managed in `static/admin/config.yml`

4. Change font

   1. Add/change your font link in `nuxt.config.js` under `head.link`. You can add a `<link rel="stylesheet" href="font.css">` as `link: [{ rel: 'stylesheet', href: 'font.css' }]`, like [this](https://vue-meta.nuxtjs.org/api/#link)
   2. Then append your font name in `tailwind.config.js` under `theme.extend.fontFamily.sans` (or other).
   3. Then if you've uncommented the included netlify plugin "[Subfont](https://github.com/Munter/netlify-plugin-subfont#readme)" in `netlify.toml`, it will automatically post-processes your web page to use an optimal font loading strategy.

## More info

> This project was bootstrapped with `create-nuxt-app`. There are more detailed explanations of how everything works in the [Nuxt.js docs](https://nuxtjs.org).

### Netlify Identity

Make sure to set to "registration invite only" [here](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_SLUG/settings/identity#registration-preferences) if you don't want spam.

When you create your first account, _don’t_ sign up using OAuth, generate a new password and sign in that way locally, otherwise a successful login will send you to the URL you typed in instead of keeping you on localhost.

If you want the Netlify signup emails to work with this boilerplate, you need to either add the 'netlify-identity-widget' to `nuxt.config.js` under `head`, [Follow the advice here](https://answers.netlify.com/t/common-issue-netlify-cms-git-gateway-email-not-confirmed/10690). Or enable the fixed and included email-templates’ paths in Netlify, under [Site Settings > Identity > Emails](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_SLUG/settings/identity) and there you can set `/static/emails/THE_TEMPLATE_NAME.html` for each template.

---

Originally based on [Henry Desroches' nuxt-netlify-cms-starter](https://github.com/xdesro/nuxt-netlify-cms-starter).

---

## Troubleshooting

- > I added a CSS class, but it doesn't show
- It is most likely purged by PurgeCSS, make sure it is whitelisted in `purgeCSS` in `nuxt.config.js`

- > I can’t log in to `/admin` on localhost and use my local git as CMS
- Open up a new terminal and run `npx netlify-cms-proxy-server`, the login again.

- > I tried logging into/saving in Netlify CMS, but I can't
- It may be that you haven't [enabled Netlify Identity](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_SLUG/settings/identity) or [setup the Git Gateway](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_SLUG/settings/identity#services) correctly, [check the docs](https://www.netlifycms.org/docs/git-gateway-backend/)

- > I get Netlify emails but can't use them to login etc.
- It is probably because the 'netlify-identity-widget' is only included in the `/admin`-page. [Follow the advice here](https://answers.netlify.com/t/common-issue-netlify-cms-git-gateway-email-not-confirmed/10690) or enable the included email-templates’ paths in Netlify, under [Site Settings > Identity > Emails](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_SLUG/settings/identity) and there you can set `/static/emails/THE_TEMPLATE_NAME.html` for each template. This will make sure to use the correct links inside the emails. Look at @audetcameron’s [screenshot here](https://github.com/Knogobert/ntn-boilerplate/issues/8#issuecomment-841469850).

- > "This repository is configured for Git LFS but 'git-lfs' was not found on your path."
- Install git-lfs then run `git lfs install` in project root. Then to download the images, run `git lfs pull`. Or if you don't want to download the files/can't login to the lfs server, run `git lfs install --skip-smudge` instead.

- > I can’t get Git LFS to run correctly on Netlify
- Make sure that you have in your [Netlify build settings](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_SLUG/settings/deploys#environment-variables), set the environment variable `GIT_LFS_ENABLED` : `true`. Then also make sure that Netlify LM is setup as [their docs](https://docs.netlify.com/large-media/setup/) specify.
