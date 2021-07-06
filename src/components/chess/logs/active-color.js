import { withGame } from '../game'

export const ActiveColor = withGame(({ game: { activeColor }, content: { colors } }) => (
  <p>{activeColor.replace('{color}', colors[activeColor])}</p>
))
