const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = {
    mode: process.env.NODE_ENV || 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "vm": require.resolve("vm-browserify"),
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify")
        }
    }
};

const nodeConfig = {
    ...common,
    target: 'node',
    entry: {
        cli: './src/cli.ts',
        'lsp-server': './src/lsp/server.ts',
        'debug-adapter': './src/debug/debugAdapter.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
    },
    externals: {
        'vscode': 'commonjs vscode'
    },
    plugins: process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []
};

const webConfig = {
    ...common,
    target: 'web',
    entry: {
        'sanskrit-web': './src/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/web'),
        library: 'Sanskrit',
        libraryTarget: 'umd',
        globalObject: 'this'
    }
};

module.exports = [nodeConfig, webConfig];