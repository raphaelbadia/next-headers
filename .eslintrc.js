module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-nextheaders`
  extends: ["nextheaders"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
