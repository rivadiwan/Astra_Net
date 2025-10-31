const fs = require('fs');
const postcss = require('postcss');
const tailwindPostcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

async function build() {
  try {
    const inputPath = './src/styles/tailwind.css';
    const outPath = './dist/styles.css';
    const input = fs.readFileSync(inputPath, 'utf8');

    const result = await postcss([tailwindPostcss('./tailwind.config.cjs'), autoprefixer()])
      .process(input, { from: inputPath, to: outPath });

    fs.mkdirSync('dist', { recursive: true });
    fs.writeFileSync(outPath, result.css);
    if (result.map) fs.writeFileSync(outPath + '.map', result.map.toString());
    console.log('Built CSS to', outPath);
  } catch (err) {
    console.error('Error building CSS:', err);
    process.exit(1);
  }
}

build();
