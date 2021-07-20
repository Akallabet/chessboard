import { useEffect, useState } from 'react'
import { useLoadData, useStorage } from '../storage'
import * as game from 'chess-fp'

const { start } = game

export const useGame = ({ onMove, defaultInitialData }) => {
  const data = useLoadData() || defaultInitialData

  const [info, setEngine] = useState(() => start(data))
  const [metaBoard, setMetaBoard] = useState(game.getMoves())
  const [activePiece, setActivePiece] = useState()
  const [promotionPieces, setPromotionPieces] = useState([])
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false)
  const openPromotionModal = () => setIsPromotionModalOpen(true)
  const closePromotionModal = () => setIsPromotionModalOpen(false)

  const {
    state,
    constants: { ranks, files },
  } = info

  const {
    board,
    FEN: { activeColor },
    isCheckMate,
    isDraw,
    current,
    history,
  } = state

  const move = (input) => game.move(input)(info)
  const getMove = (origin, destination) => game.getMove({ origin, destination })(info)
  const getMoves = (input) => game.getMoves(input)(info)
  const undo = () => game.undo()(info)
  const redo = () => game.redo()(info)

  useEffect(() => {
    if (promotionPieces.length) {
      openPromotionModal(true)
    } else {
      setActivePiece()
    }
  }, [promotionPieces])

  useEffect(() => {
    if (!isPromotionModalOpen) {
      setPromotionPieces([])
    }
  }, [isPromotionModalOpen])

  useEffect(() => {
    setMetaBoard(game.getMoves())
  }, [info])

  useEffect(() => {
    if (activePiece) {
      const { file, rank } = activePiece
      setMetaBoard(getMoves(`${file}${rank}`))
    } else {
      setMetaBoard(game.getMoves())
    }
  }, [activePiece])

  useStorage({ state })

  return {
    board,
    metaBoard,
    activePiece,
    activeColor,
    ranks,
    isCheckMate,
    isDraw,
    current,
    history,
    files,
    isPromotionModalOpen,
    promotionPieces,
    getMove,
    selectPiece: setActivePiece,
    deselectPiece: setActivePiece,
    moveActivePiece: (args) => {
      setEngine(move(args))
      onMove()
    },
    undo: () => {
      setEngine(undo())
    },
    redo: () => {
      setEngine(redo())
    },
    reset: () => {
      setEngine(start(defaultInitialData))
    },
    setPromotionPieces,
    closePromotionModal,
  }
}
