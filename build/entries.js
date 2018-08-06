const glob = require('glob');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
let entries = {}, HTMLPlugins = [];

function getEntries(globPath) {
    let files = glob.sync(globPath);
    files.forEach(function(filepath) {
        let  pathSplit = filepath.split('/');
        let name = pathSplit[2];
        entries[name] = ['./' + filepath, './build/dev-client'];

        const htmlPlugin = new HTMLWebpackPlugin({
            filename: `${name}.html`,
            template: `${path.resolve(__dirname, `../src/view/${name}/index.html`)}`,
            chunks: [name]
        });

        HTMLPlugins.push(htmlPlugin);

    });
}

getEntries('src/view/**/assets/js/index.js');

module.exports =  {
    entries,
    HTMLPlugins
}
