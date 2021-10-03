import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Button } from '@chakra-ui/react';

export default {
    title: 'Button',
    component: Button,
    decorators: [withKnobs],
};

export const Basic = () => (
    <Button disabled={boolean('Disabled', false)}>Button</Button>
);
