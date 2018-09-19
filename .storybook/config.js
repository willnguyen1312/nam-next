import { addDecorator, configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';
addDecorator(withKnobs);
setAddon(JSXAddon);

// automatically import all files ending in *.stories.js
const reqs = [require.context('../src/storybookDemo', true, /.stories.tsx$/)];
function loadStories() {
  reqs.forEach(req => {
    req.keys().forEach(filename => req(filename));
  });
}

configure(loadStories, module);
