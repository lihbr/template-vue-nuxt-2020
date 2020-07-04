/* HEALTH:HIGH smart-link */
const logger = require("consola").withScope("lihbr:smart-link");

import { mergeData } from "vue-functional-data-merge";

const FRAMEWORK_LINK = "nuxt-link";

/**
 * Finds out whether or not link should be external
 * @param {Boolean} external - force an external link
 * @param {Boolean} internal - force an internal link
 * @param {Boolean} href - string to test for an external link
 * @return {Boolean} - true if external
 */
const isInternal = ({ external, internal, href }) => {
  if (external && internal) {
    logger.warn(`props "external" and "internal" are both true and conflicting with each other, giving priority to "external"`); // eslint-disable-line
    return false;
  }

  if (external) {
    return false;
  }

  if (internal) {
    return true;
  }

  const regex = /^\/(?!\/|assets).*$/gm; // match internal links
  return regex.test(href);
};

export default {
  name: "SmartLink",
  functional: true,
  props: {
    href: {
      type: String,
      default: ""
    },
    blank: {
      type: Boolean,
      default: false
    },
    external: {
      type: Boolean,
      default: false
    },
    internal: {
      type: Boolean,
      default: false
    }
  },
  render(createElement, { props, data, slots }) {
    // Resolve html tag
    let htmlTag = "span";
    if (props.href) {
      if (isInternal(props) && !props.blank) {
        htmlTag = FRAMEWORK_LINK;
      } else {
        htmlTag = "a";
      }
    }

    // Forward event listeners if not an internal link
    let on = {};
    if (htmlTag !== FRAMEWORK_LINK) {
      on = { ...data.nativeOn };
      delete data.nativeOn;
    }

    // Apply right attributes depending on final link type
    const attrs = {};
    switch (htmlTag) {
      case FRAMEWORK_LINK:
        attrs.to = props.href;
        break;

      case "a":
        attrs.href = props.href;
        if (props.blank) {
          attrs.target = "_blank";
          attrs.rel = "noopener";
        }
        break;

      default:
        break;
    }

    return createElement(
      htmlTag,
      mergeData(data, { class: "smartLink", attrs, on }),
      slots().default
    );
  }
};
