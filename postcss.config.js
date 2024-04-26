import autoprefixer from 'autoprefixer';
import modifySelectors from 'modify-selectors';
import inlineImports from 'postcss-import';
import importGlob from 'postcss-import-ext-glob';
import minify from 'postcss-minify';
import nesting from 'postcss-nesting';

const config = {
  plugins: [
    // Expand glob imports like @import-glob 'components/**/*.css'; into individual imports...
    importGlob,
    // ...then inline all the @import statements
    inlineImports,
    // undo nesting until samsung internet support drops https://caniuse.com/css-nesting
    nesting,
    // Scope css variables to the web component :host instead of :root
    modifySelectors({
      replace: [
        {
          match: ':root',
          with: ':host',
        },
      ],
    }),
    autoprefixer,
    minify,
  ],
};

export default config;
