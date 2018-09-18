import * as React from 'react'

import { boolean, text } from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import { wInfo } from '../utils'
import { Button } from './Button'

(storiesOf('Components/Button', module) as any).addWithJSX(
  'basic Button',
  wInfo(`

  ### Notes

  This is a button

  ### Usage
  ~~~js
  <Button
    label={'Enroll'}
    disabled={false}
    onClick={() => alert('hello there')}
  />
  ~~~`)(() => (
    <Button
      label={text('label', 'Enroll')}
      disabled={boolean('disabled', false)}
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => alert('hello there')}
    />
  ))
)
