import React from 'react'
export default function Square(props) {
  let className = "square"
  if (props.value === 'X') {
    className += ' x-color';
  } else if (props.value === 'O') {
    className += ' o-color';
  }

  return (
    <button className={className} onClick={props.onSquareClick}>{props.value}</button>
  )
}
