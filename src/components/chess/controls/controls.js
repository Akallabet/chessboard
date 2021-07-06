import { withGame } from '../game'
import { Box } from '../../box'
import { Button } from '../../button'
import { Reset } from './reset'

export const Controls = withGame(({ game: { reset, undo, redo, current, history } }) => {
  return (
    <Box flex flexRow spacex={1}>
      <Reset onClick={reset} />
      <Button onClick={undo} aria-label="undo" disabled={current === 0}>
        {'<'}
      </Button>
      <Button onClick={redo} aria-label="redo" disabled={current === history.length - 1}>
        {'>'}
      </Button>
    </Box>
  )
})
