require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        //uses the new jsx transform that came with React 17
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      //CRA handle images through 'url-loader' plugin.
      //'url-loader' encodes images smaller than 10K as base64
      //otherwise uses[name].[md4: hash: hex: 8].[ext]
      "transform-assets",
      {
        extensions: ["bmp", "gif", "jpeg", "jpg", "png"],
        limit: 10000,
        //CRA uses url-loader that by default uses [md4, hex] hash...
        name: "static/media/[name].[md4:hash:hex:8].[ext]",
      },
    ],
    //CRA handle svg through 'file-loader' plugin
    //It always format as [name].[md4: hash: hex: 8].[ext]
    //use 'transform-assets' a second time for svg as 10K limit size is non needed
    [
      "transform-assets",
      {
        extensions: ["svg"],
        name: "static/media/[name].[md4:hash:hex:8].[ext]",
      },
      "transform-assets-svg",
    ],
  ],
  extensions: [".tsx", ".ts", ".es6", ".es", ".jsx", ".js", ".mjs"],
});

require("./server");
