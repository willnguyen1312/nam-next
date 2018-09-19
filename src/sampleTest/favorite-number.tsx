import * as React from 'react'

class FavoriteNumber extends React.Component<any, any> {
  static defaultProps = { min: 1, max: 9 }
  state = { _number: 0, numberEntered: false }
  handleChange = event => {
    this.setState({ numberEntered: true, number: Number(event.target.value) })
  }
  render() {
    const { _number, numberEntered } = this.state
    const { min, max } = this.props
    const isValid = !numberEntered || (_number >= min && _number <= max)
    return (
      <div>
        <label htmlFor="favorite-number">Favorite Number</label>
        <input
          id="favorite-number"
          type="number"
          value={_number}
          onChange={this.handleChange}
        />
        {isValid ? null : (
          <div data-testid="error-message">The number is invalid</div>
        )}
      </div>
    )
  }
}

export { FavoriteNumber }
