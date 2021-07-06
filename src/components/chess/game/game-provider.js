import { func, node, string } from 'prop-types'
import GameContext from './game-context'
import { useGame } from './use-game'

export const GameProvider = ({ FEN: FENString, onMove, children }) => {
  const game = useGame({
    onMove,
    defaultInitialData: { FENString },
  })

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>
}

GameProvider.propTypes = {
  FEN: string.isRequired,
  onMove: func,
  children: node.isRequired,
}

GameProvider.defaultProps = {
  onMove: () => {},
}
