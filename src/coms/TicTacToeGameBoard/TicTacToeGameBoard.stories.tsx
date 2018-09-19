import { withInfo } from "@storybook/addon-info"
import { storiesOf } from "@storybook/react"
import React, { ReactElement, SFC } from "react"
import TicTacToeCell from "../TicTacToeCell"
import { TicTacToeGameBoard } from "./TicTacToeGameBoard"

const stories = storiesOf("Components", module)

stories.add(
  "TicTacToeGameBoard",
  withInfo({ inline: true })(() => (
    <div style={{ display: "flex" }}>
      <div style={{ width: 300, marginRight: 20 }}>
        <TicTacToeGameBoard cells={placeholderCells} />
      </div>
      <div style={{ width: 300 }}>
        <TicTacToeGameBoard cells={gameCells} lineStyle="dashed" />
      </div>
    </div>
  )),
)

const PlaceholderCell: SFC<object> = () => (
  <p style={{ margin: 0, color: "#eee" }}>Cell</p>
)

const placeholderCells: Array<ReactElement<any>> = []
for (let i = 0; i < 9; i += 1) {
  placeholderCells.push(<PlaceholderCell key={i} />)
}

const gameCells: Array<ReactElement<any>> = []
const gameCellValues = "XOX O O X"
for (let y = 0; y < 3; y += 1) {
  for (let x = 0; x < 3; x += 1) {
    gameCells.push(
      <TicTacToeCell
        key={`${x}${y}`}
        value={gameCellValues.charAt(y * 3 + x) as any}
        position={{ x, y }}
      />,
    )
  }
}
