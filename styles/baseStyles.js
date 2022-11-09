/** This is our base component styles */
import {
  color,
  space,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow,
  compose,
} from 'styled-system'

export const base = compose(
  () => ({ boxSizing: 'border-box' }),
  color,
  space,
  typography,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
  shadow
)
