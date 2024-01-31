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
    // Swap :root with :host to fix the css variable scope
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
