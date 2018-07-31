## :book: JS RSS Reader ##

A simple, barebones RSS reader written in ES6 JavaScript.

No accounts, no social media integration... or really much of anything.

---

### Goals ###
1. Build out a basic RSS reader with the ability to manage feeds
2. Keep project dependency free (as much as humanly possible) in order to better learn utilize ES6 Javscript features as well as new Web APIs such as Fetch
3. Have fun learning along the way

In an effort to learn more about JS, especially ES6, I wanted to create something I can use - I end up more invested in building things for fpr either my use or other's use as opposed to ``foo bar baz`` tutorials.

Being as how most RSS readers these days require an account, I wanted to build an RSS reader that I can use on my local machine, with no account, and still check out all the sites I like reading in one place.

---

### How To Get Up and Running ###

1. Clone repo to you machine

2. Open index.html in your browser of choice

NOTE: To add or remove sites from the RSS reader, you can edit the feedURLs.json file in this project. All you need to supply is a URL with the title feedURL like so:

``` JSON
{
  "feedUrl": "https://javascriptweekly.com/rss"
}
```

NOTE: While working/testing locally until I ready to get a server set up, I am using [CORS-Anywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) on Firefox to work with CORS. This is not ideal for anything besides development use and will be changed in the future.

---

NOTE: This is a personal project where I am building something for myself to use so code will likely be a little messy as I learn more and add features to this project as I think of them. If you like what you see, feel free to fork/clone. If you are interested in helping out, feel free to check out the Issues page and pick something up to work on or add an issue.