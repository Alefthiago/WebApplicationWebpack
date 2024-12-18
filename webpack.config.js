//      VARIAVEIS.      //
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const path = require('path');
//     /VARIAVEIS.      //

//      MAPEAMENTO DOS ARQUIVOS.        //
function groupEntriesByFolder(pattern) {
    let entries = {};
    let files = glob.sync(pattern);

    files.forEach((file) => {
        //console.log(file);
        let folderName = path.dirname(file).split(path.sep).pop();
        let fileName = path.basename(file, path.extname(file));

        if (!entries[folderName]) {
            entries[folderName] = {};
        }
        entries[folderName][fileName] = path.resolve(__dirname, file);
    });
    return entries;
}
//     /MAPEAMENTO DOS ARQUIVOS.        //

const groupedEntries = groupEntriesByFolder('./Src/js/**/*.js');
const flatEntries = Object.keys(groupedEntries).reduce((acc, folder) => {
    Object.keys(groupedEntries[folder]).forEach((file) => {
        acc[`${folder}/${file}`] = groupedEntries[folder][file];
    });
    return acc;
}, {});

//console.log(flatEntries);
module.exports = {
    mode: 'production',
    entry: flatEntries,
    output: {
        filename: '[name].bundle.js?v=[contenthash]',
        path: path.resolve(__dirname, './wwwroot/dist/js/'),
    },
    devServer: {
        webSocketServer: false,
        static: {
            directory: path.join(__dirname, './wwwroot/dist'),
        },
        hot: false,
        port: 5000,
        open: false,
        devMiddleware: {
            writeToDisk: (filePath) => filePath.endsWith('.js') || filePath.endsWith('.cshtml'), // Permitir que os arquivos sejam gravados no disco
        },
        proxy: [
            {
                context: () => true,
                target: 'http://localhost:9000',
                changeOrigin: true,
                secure: false,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...Object.keys(groupedEntries).map((folderName) => {
            let outputPath;
            //console.log(folderName);
            if (folderName === 'js') {
                outputPath = path.resolve(__dirname, './Views/Shared/Components/Webpack/index.cshtml');
            } else {
                outputPath = path.resolve(
                    __dirname,
                    `./Views/Shared/Components/Webpack/${folderName}/index.cshtml`
                );
            }
            //console.log(outputPath)
            return new HtmlWebpackPlugin({
                inject: false,
                templateContent: ({ htmlWebpackPlugin }) => {
                    const scripts = Object.keys(groupedEntries[folderName])
                        .map((fileName) => {
                            const jsPath = htmlWebpackPlugin.files.js.find((jsPath) =>
                                jsPath.includes(`/${folderName}/${fileName}.bundle.js`)
                            );

                            //console.log(jsPath)
                            if (jsPath) {
                                return `<script src="${jsPath.replace('/wwwroot', '')}"></script>`;
                            }
                        })
                        .join('\n');

                    return scripts || `<!-- Nenhum script encontrado -->`;
                },
                filename: outputPath,
            });
        }),
    ],
};