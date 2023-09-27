import fs from 'node:fs';

const generateStyleMixin = () => {
  const input = fs.readFileSync('dist/style.css', {
    encoding: 'utf8',
  });

  const output = `@mixin style { ${input} }`;

  fs.writeFileSync('dist/style-mixin.scss', output);
};

generateStyleMixin();
