import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

// Add the following lines to import Sass loader and types
import 'sass-loader';
import 'style-loader';
import 'css-loader';
import 'file-loader';

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
  },
  {
    test: /\.s[ac]ss$/i,
    use: ["style-loader", "css-loader", "sass-loader",],
  },
  {
    test: /\.svg$/,
    use: [{loader: '@svgr/webpack'}, {loader: 'url-loader'}],
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192, // If the file size is less than 8KB, convert it to a data URL
          fallback: 'file-loader', // Otherwise, use the file-loader
        },
      },
    ],
  },
);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.svg', '.png', '.jpg', '.gif', '.jpeg']
  },
};
