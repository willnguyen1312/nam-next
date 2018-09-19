import React, { ReactElement, SFC } from 'react'
// import * as styles from "./TicTacToeGameBoard.css";

interface Props {
  /**
   * An array of 9 React elements to serve as the Tic Tac Toe game cells.
   */
  cells: Array<ReactElement<any>>

  /**
   * Line style to use when dividing game cells.
   *
   * @default solid
   */
  lineStyle?: 'solid' | 'dashed'
}

/**
 * Arranges the React elements provided by "cells" within a Tic Tac Toe board.
 * It requires that 9 elements be provided. The game board maintains a 1:1 size
 * ratio.
 */
export const TicTacToeGameBoard: SFC<Props> = props => {
  const { cells, lineStyle = 'solid', ...rest } = props

  return (
    <div {...rest}>
      <div>
        {cells.map((cell, index) => (
          <div key={index} style={{ borderStyle: lineStyle }}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  )
}
