module.exports = plop => {
  const trimSlashFilter = input => {
    return input.replace(/^\//, "").replace(/\/$/, "");
  };

  plop.setGenerator("component", {
    description: "create a standard component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Standard component name:"
      },
      {
        type: "list",
        name: "category",
        message: "Component category:",
        choices: [
          {
            name: "controls (agnostic components manipulating data)",
            value: "controls"
          },
          { name: "display (visual components)", value: "display" },
          { name: "layout (layout components)", value: "layout" },
          {
            name: "partials (application's partials components)",
            value: "partials"
          },
          {
            name:
              "sections (page related components that are too specific for belonging to display)",
            value: "sections"
          }
        ]
      },
      {
        type: "input",
        name: "namespace",
        message: "Component namespace: (optional)",
        filter: trimSlashFilter
      }
    ],
    actions: data => [
      {
        type: "add",
        path: `${__dirname}/src/components/{{ category }}/{{ pathCase namespace }}/{{ pascalCase name }}.vue`,
        templateFile: `${__dirname}/src/plop-templates/component.vue`,
        force: false,
        data: {
          fullname: `${data.namespace}/${data.name}`
        },
        abortOnFail: true
      }
    ]
  });

  plop.setGenerator("page", {
    description: "create a page component",
    prompts: [
      {
        type: "input",
        name: "route",
        message: "Page route:",
        filter: trimSlashFilter
      },
      {
        type: "input",
        name: "param",
        // eslint-disable-next-line
        message: "Page route param: (default to \"index\")",
        default: "index"
      }
    ],
    actions: [
      {
        type: "add",
        path: `${__dirname}/src/pages/{{ pathCase route }}/{{ param }}.vue`,
        templateFile: `${__dirname}/src/plop-templates/page.vue`,
        force: false,
        data: {},
        abortOnFail: true
      }
    ]
  });

  plop.setGenerator("layout", {
    description: "create a layout component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Layout component name:"
      }
    ],
    actions: [
      {
        type: "add",
        path: `${__dirname}/src/layouts/{{ camelCase name }}.vue`,
        templateFile: `${__dirname}/src/plop-templates/layout.vue`,
        force: false,
        data: {},
        abortOnFail: true
      }
    ]
  });
};
