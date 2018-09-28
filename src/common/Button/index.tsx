import * as React from 'react'
import styled from 'styled-components'

const backgroundMap = {
  secondary: 'gray',
}

interface BBBProps {
  size?: number
  kind?: string
  padding?: string
  attrs: any
}

const BBB = styled.button.attrs({
  title: 'Submit Button',
})`
  color: violet;
  font-weight: bold;
  font-size: ${(props: BBBProps) => props.size || '18px'};
  padding: 15px 60px;
  background: ${(props: BBBProps) => backgroundMap[props.kind] || '#fff'};
  padding: ${(props: BBBProps) => props.padding || 'initial'};
`

interface ButtonProps {
  size?: number
  kind: string
  padding?: string
  children: React.ReactNode
}

const Button = ({
  size = 16,
  kind = 'normal',
  padding = '0 0',
  children,
}: ButtonProps) => {
  return (
    <BBB attrs="" size={size} kind={kind} padding={padding}>
      {children}
    </BBB>
  )
}

export default Button
