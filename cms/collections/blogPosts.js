export default {
  name: "blog",
  label: "Blog Posts",
  label_singular: "Blog Post",
  description: "Basic blog posts",
  folder: "content/posts/blog",
  extension: "json",
  format: "json",
  create: true, // Allow users to create new documents in this collection
  slug: "{{slug}}",
  preview_path: "blog/{{slug}}",
  summary: "{{title}}",
  fields: [
    { name: "title", label: "Title", widget: "string", required: true },
    { name: "body", label: "Body", widget: "markdown", required: true }
  ]
};
