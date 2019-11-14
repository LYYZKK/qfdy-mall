module.exports = {
  presets: ["@vue/app",
    [
      '@babel/preset-env'
    ]
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};
