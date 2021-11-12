module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  moduleDirectories: ["node_modules", "src"],
};
