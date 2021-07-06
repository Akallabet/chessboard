import { withI18n } from '../../../i18n'
import { Box } from '../../box'
import { withGame } from '../game'

export const Logs = withGame(
  withI18n(({ game: { isCheckMate, isDraw, activeColor }, content }) => (
    <Box>
      {isCheckMate ? (
        <p>{content.checkmate}</p>
      ) : isDraw ? (
        <p>{content.draw}</p>
      ) : (
        <p>{content.activeColor.replace('{color}', content.colors[activeColor])}</p>
      )}
    </Box>
  ))
)
