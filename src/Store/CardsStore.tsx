import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Card } from '../TeamBoard.types.tsx'

type CardStoreState = {
    cards: Array<Card>
    addCard: (card: Card) => void
    deleteCard: (cardId: string) => void
    updateCard: (card: Card) => void
}

const CARDS_LOCAL_STORAGE_KEY = 'cards';

export const useCardStore = create<CardStoreState>()(
    persist(
        (set) => ({
            cards: [],
            addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
            deleteCard: (cardId) => set((state) => ({ cards: state.cards.filter((card) => card.id !== cardId) })),  
            updateCard: (card) => set((state) => ({ cards: state.cards.map((c) => c.id === card.id ? card : c) })),
        }),
        {
            name: CARDS_LOCAL_STORAGE_KEY,
        }
    )
)