const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(controllers) {
    return Object.keys(controllers).map((controllerName) => {
        let outputPath = path.resolve(__dirname, `./Views/Shared/Components/Webpack/${controllerName}/index.cshtml`);

        return new HtmlWebpackPlugin({
            inject: false,
            templateContent: ({ htmlWebpackPlugin }) => {
                const scripts = Object.keys(controllers[controllerName])
                    .map((fileName) => {
                        const jsPath = htmlWebpackPlugin.files.js.find((jsPath) =>
                            jsPath.includes(`/${controllerName}/${fileName}.bundle.js`)
                        );

                        if (jsPath) {
                            return `<script src="${jsPath.replace('/wwwroot', '')}"></script>`;
                        } else {
                            return `<!-- Script não encontrado para ${controllerName}/${fileName} -->`;
                        }
                    })
                    .join('\n');

                return scripts || `<!-- Nenhum script encontrado -->`;
            },
            filename: outputPath,
        });
    });
}