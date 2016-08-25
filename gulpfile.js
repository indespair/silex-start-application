var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

var NODE_ENV = process.env.NODE_ENV || "development";

var webpackConfig = {
    context: __dirname + "/src",
    entry: "./main.coffee",
    output: {
        path: __dirname + "/web/js",
        filename: "./main.js"
    },
    module: {
        loaders: [
            { test: /\.coffee$/, loader: "coffee-loader" }
        ]
    },
    plugins: [],
    devtool : NODE_ENV === "development" ? "#cheap-inline-source-map" : null
};

if (NODE_ENV === "production") {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
};

var webpackBuildCallback = function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
        "hash": false,
        "version": false,
        "chunks":  false
    }));
};

gulp.task("watch", function() {
    var compiler = webpack(webpackConfig)
    compiler.watch({}, webpackBuildCallback);
});

gulp.task("build", function() {
    webpack(webpackConfig, webpackBuildCallback);
});
