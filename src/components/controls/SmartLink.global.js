const logger = require("consola").withScope("lihbr:smart-link");

import { mergeData } from "vue-functional-data-merge";

const FRAMEWORK_LINK = "nuxt-link";

export default {
  name: "SmartLink",
  functional: true,
  props: {
    // Target
    href: {
      type: String,
      default: () => ""
    },
    // Link title
    title: {
      type: String,
      default: () => ""
    },
    // Open target on a new page
    blank: {
      type: Boolean,
      default: false
    },
    // Force an external link
    external: {
      type: Boolean,
      default: false
    },
    // Force an internal link
    internal: {
      type: Boolean,
      default: false
    }
  },
  render(createElement, { props, data, slots }) {
    const $slots = slots();

    const isInternal = (() => {
      if (props.external && props.internal) {
        logger.warn(
          'props "external" and "internal" are both true and conflicting with each other, giving priority to "external"' // eslint-disable-line
        );
        return false;
      }

      if (props.external) {
        return false;
      }

      if (props.internal) {
        return true;
      }

      const regex = /^(([a-z0-9]*:|.{0})\/\/|mailto:|\.\/assets).*$/gim; // match external links
      return !regex.test(props.href);
    })();

    const titleAttribute = (() => {
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

    const htmlTag = (() => {
      if (props.href) {
        if (isInternal && !props.blank) {
          return FRAMEWORK_LINK;
        } else {
          return "a";
        }
      } else {
        return "span";
      }
    })();

    let on = {};
    if (htmlTag !== FRAMEWORK_LINK) {
      on = { ...data.nativeOn };
      delete data.nativeOn;
    }

    const attrs = {
      ...data.attrs,
      title: titleAttribute
    };

    if (htmlTag === FRAMEWORK_LINK) {
      attrs.to = props.href;
    } else if (htmlTag === "a") {
      attrs.href = props.href;
      if (props.blank) {
        attrs.target = "_blank";
        attrs.rel = "noopener";
      }
    }

    return createElement(
      htmlTag,
      mergeData(data, { class: "smartLink", attrs, on }),
      $slots.default
    );
  }
};
