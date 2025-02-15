   1. Run `npm i` to download depenedencies
   2. Run one of the following commands (`npm run <command>`) to build the js/css assets:

| Command                     | Description |
| --------------------------- | -------------------------------------- |
| `dev` | _Compile & watch for changes._                       |
| `dev:hashed` | _Same as above but with hashed filenames._    |
| `build` | _*Compile minified production build.* This will also generate .gz (gzip) and .br (brotli) compressed versions of the js and css assets that can be used if the server environment supports them._ |
| `build:hashed` | _Same as above but with hashed filenames._ |

Assets are compiled into the `compiledAssetOutputPath` set in `webpack/_config.js`.
