import autoprefixer from 'autoprefixer';
import modifySelectors from 'modify-selectors';
import inlineImports from 'postcss-import';
import importGlob from 'postcss-import-ext-glob';

const config = {
  plugins: [
    // Expand glob imports like @import-glob 'components/**/*.css'; into individual imports...
    importGlob,
    // ...then inline all the @import statements
    inlineImports,
    autoprefixer,
    // Scope css variables to the web component :host instead of :root
    modifySelectors({
      replace: [
        {
          match: ':root',
          with: ':host',
        },
      ],
    }),
  ],
};

export default config;
