import { useEffect, useState } from 'react'
import { useLoadData, useStorage } from '../storage'
import * as game from 'chess-fp'

const { start } = game

export const useGame = ({ onMove, defaultInitialData }) => {
  const data = useLoadData() || defaultInitialData

  const [info, setEngine] = useState(() => start(data))

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

  const getEmptyMoves = () => game.getMoves()()
  const move = (input) => game.move(input)(info)
  const getMove = (origin, destination) => game.getMove({ origin, destination })(info)
  const getMoves = (input) => game.getMoves(input)(info)
  const undo = () => game.undo()(info)
  const redo = () => game.redo()(info)

  const [metaBoard, setMetaBoard] = useState(() => getEmptyMoves())
  const [activePiece, setActivePiece] = useState()
  const [promotionPieces, setPromotionPieces] = useState()
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false)
  const openPromotionModal = () => setIsPromotionModalOpen(true)
  const closePromotionModal = () => setIsPromotionModalOpen(false)

  useEffect(() => {
    if (promotionPieces && promotionPieces.length) openPromotionModal(true)
  }, [promotionPieces])

  useEffect(() => {
    if (!isPromotionModalOpen) {
      setPromotionPieces()
      setActivePiece()
      setMetaBoard(getEmptyMoves())
    }
  }, [isPromotionModalOpen])

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
    selectPiece: (piece) => {
      const { file, rank } = piece
      setActivePiece(piece)
      setMetaBoard(getMoves(`${file}${rank}`))
    },
    deselectPiece: () => {
      setActivePiece()
      setMetaBoard(getEmptyMoves())
    },
    moveActivePiece: (args) => {
      setEngine(move(args))
      onMove()
      setMetaBoard(getEmptyMoves())
    },
    undo: () => {
      setEngine(undo())
      setMetaBoard(getEmptyMoves())
    },
    redo: () => {
      setEngine(redo())
      setMetaBoard(getEmptyMoves())
    },
    reset: () => {
      setEngine(start(defaultInitialData))
      setMetaBoard(getEmptyMoves())
    },
    setPromotionPieces,
    closePromotionModal,
  }
}
