import { mergeData } from "vue-functional-data-merge";

const FRAMEWORK_LINK = "nuxt-link";

export default {
  functional: true,
  props: {
    href: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      default: () => ""
    },
    blank: {
      type: Boolean,
      default: false
    }
  },
  render(createElement, { props, data, slots }) {
    const $slots = slots();

    const isRelative = (() => {
      const regex = /^(([a-z0-9]*:|.{0})\/\/|mailto:|\.\/assets).*$/gim; // match if absolute
      return props.href.match(regex) === null;
    })();

    const realTitle = (() => {
      if (props.title) {
        return props.title;
      } else if (
        $slots.default &&
        $slots.default[0] &&
        $slots.default[0].text
      ) {
        return $slots.default[0].text.trim();
      } else {
        return "";
      }
    })();

    const tag = (() => {
      if (props.href) {
        if (isRelative) {
          return FRAMEWORK_LINK;
        } else {
          return "a";
        }
      } else {
        return "span";
      }
    })();

    let on = {};
    if (tag !== FRAMEWORK_LINK) {
      on = { ...data.nativeOn };
      delete data.nativeOn;
    }

    const attrs = { ...data.attrs };

    if (tag === FRAMEWORK_LINK) {
      attrs.to = props.href;
      attrs.title = realTitle;
    } else if (tag === "a") {
      attrs.href = props.href;
      if (props.blank) {
        attrs.target = "_blank";
        attrs.rel = "noopener";
        attrs.title = realTitle;
      }
    }

    return createElement(
      tag,
      mergeData(data, { class: "smartLink", attrs, on }),
      $slots.default
    );
  }
};
