// tslint:disable:jsdoc-format
import * as React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  display: flex;
  color: red;
`
import './Button.css'
export interface Props {
  /** this dictates what the button will say  */
  label: string
  /** this dictates what the button will do  */
  onClick: () => void
  /**
   * Disables onclick
   *
   * @default false
   **/
  disabled?: boolean
}
const noop = () => {}; // tslint:disable-line
export const Button = (props: Props) => {
  const { label, onClick, disabled = false } = props
  const disabledclass = disabled ? 'Button_disabled' : ''
  return (
    <ButtonWrapper
      className={`Button ${disabledclass}`}
      onClick={!disabled ? onClick : noop}
    >
      <span>{label}</span>
    </ButtonWrapper>
  )
}
