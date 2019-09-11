const env = require("./env");

module.exports = {
  title: env.APP_NAME,
  htmlAttrs: {
    lang: env.APP_LANG,
    class: "initialState initialState--loading"
  },
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, user-scalable=no"
    },
    {
      hid: "description",
      name: "description",
      content: env.APP_DESC
    },
    { name: "msapplication-TileColor", content: "#da532c" },
    { name: "theme-color", content: "#feeeee" }
  ],
  script: [
    // {
    //   src: SRC,
    //   defer: "", // delete key to false
    //   async: "", // delete key to false
    //   body: true // in body if true
    // }
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png"
    },
    {
      rel: "manifest",
      href: "/site.webmanifest"
    },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#e84311"
    }
  ]
};
