module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["deps", "functions", "datalayer", "modules", "config", "core"]
    ],
    "scope-empty": [2, "never"]
  }
};
