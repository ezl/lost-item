# Description

Lost Item is a site that gives a anyone a unique link, like www.lost-item.com/eric.

That person can write/sticker/attach that URL to their belongings. If the item is lost, then it allows the finder to get in touch with the correct owner without requiring the owner to have their personal information on the item.

I personally use it by printing stickers and iron on patches, which I affix to my: airpods, phone, credit cards, jacket liners, etc.

![Stickers](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbf7a39cc-dc85-4abc-9a58-db44a7a6d16a%2Fstickers.jpg?table=block&id=fde7d7eb-7e2c-492a-bd26-a7565049ac87&width=2050&userId=&cache=v2)
![Iron on patches](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5e6b6e3a-2846-4e32-a256-8718ef6e3feb%2FIMG_4812.jpeg?table=block&id=fa0f35e2-4c25-4456-bc74-322ef09c149d&width=1200&userId=&cache=v2)

# Tech

This is deployed on Github pages, because I like free hosting. Also, Github is pretty stable and this is likely to stay up longer if it is hosted on Github pages than if I do my own deployment.

I adapted this repository from https://github.com/rafgraph/spa-github-pages, which allows me to host a React single page app on Github pages.

For authentication, storage, and email sending, this uses Firebase. Also selected for "serverless", low deployment, and high reliability.

# Monetization

(A) I don't care if this makes money. That's not why I made it. I made it because I'm super forgetful, and I lose stuff all the time. My costs for running this site are basically $10/year (domain fee) and probably less than a dollar a year in Firebase costs. However, I have recovered my cell phone from it and a credit card that I left at a bar, so my theoretical "savings" are `$IPHONE_PRICE`. So I figure if I pay ICANN domain registration fees for another 70 years or so and never recover another item, I will have still broken even.

(B) But I would be an idiot to not take a shot at free money, so... this is monetized with vanity urls. A random user signing up gets a random 6 alphanumeric character link. The user can select their own link, like www.lost-item.com/eric, by paying for it.

# Deploying

Since I touch this very infrequently a reminder to myself, here are instructions for deploying.

## Frontend

1. Github automatically deploys what is in the the branch `gh-pages` to www.lost-item.com
2. Github does not build it, so you have to build this, then push it. Do so, with command `npm run build`, which will build a new `index_bundle.js` in the project root, then push it to branch `gh-pages`

## Backend

1. This is deployed to firebase under Eric's primary Google account
2. The firebase scripts are in `/firebase-func/functions`
3. In order to push these, you must have Firebase Tools installed, which you can do with `npm install -g firebase-tools`
4. from the `firebase-func/functions` path, run command `npm run deploy`
