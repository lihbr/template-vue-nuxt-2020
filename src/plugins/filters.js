import Vue from "vue";

Vue.filter("uc_first", str => {
  if (!str) {
    return "";
  }

  str = new String(str);
  return `${str.charAt().toUpperCase()}${str.slice(1)}`;
});

Vue.filter("uppercase", str => {
  if (!str) {
    return "";
  }

  str = new String(str);
  return str.toUppseCase();
});

Vue.filter("lowercase", str => {
  if (!str) {
    return "";
  }

  str = new String(str);
  return str.toLowerCase();
});
