import collections from "./collections";

const backend = {
  name: "git-gateway",
  branch: "master", // Branch to update (optional; defaults to master)
  commit_messages: {
    create: ":sparkles: Create {{collection}} > {{slug}}",
    update: ":pencil2: Update {{collection}} > {{slug}}",
    delete: ":fire: Delete {{collection}} > {{slug}}",
    uploadMedia: ":bento: Upload {{path}}",
    deleteMedia: ":fire: Delete: {{path}}"
  },
  accept_roles: ["root"] // Optional - accepts all users if left out
};

const publish_mode = "editorial_workflow";

const media_folder = "static/assets/img/uploads"; // Media files will be stored in the repo under static/assets/img/uploads
// const public_folder = "/assets/img/uploads" // The src attribute for uploaded media will begin with /assets/img/uploads
const media_library = {
  name: "cloudinary",
  use_secure_url: true,
  config: {
    cloud_name: "",
    api_key: 0
  }
};

// Back office
const site_url = "https://SITE_URL.netlify.com";
const display_url = "https://SITE_URL.netlify.com";
const logo_url = "https://SITE_URL.netlify.com/_adminAssets/logo.svg";

// Enable to display preview links
const show_preview_links = true;

// Slug
const slug = {
  encoding: "ascii",
  clean_accents: true,
  sanitize_replacement: "-"
};

export default {
  load_config_file: false,

  backend,

  publish_mode, // Disable for GitLab

  media_folder,
  // public_folder,
  media_library,

  site_url,
  display_url,
  logo_url,

  show_preview_links,

  slug,

  collections
};
