import * as React from 'react'
import styled from 'styled-components'
import { CardStatus } from '../../TeamBoard.types'
import { useCardStore } from '../../Store/CardsStore'
import { useSelectedUserStore } from '../../Store/UsersStore'
import { useGlobalStore } from '../../Store/GlobalStore'
import { CardComponent } from '../../Components/Card/Card'

const ColumnBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    flex: 1;
    border-radius: 5px;
    background-color: var(--background-secondary);
    height: 100%;
    min-width: 250px;
`;

const ColumnBoardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
`;

const ColumnBoardTitle = styled.h2`
    font-size: 1rem;
    margin: 0;
`;

const ColumnBoardBody = styled.div`
    flex: 1;
    overflow-y: auto;
    gap: 1rem;
    display: flex;
    flex-direction: column;
`;

interface ColumnBoardProps {
    readonly status: CardStatus;
}

const mapToStatus: Record<CardStatus, string> = {
    [CardStatus.ToDo]: 'To Do',
    [CardStatus.InProgress]: 'In Progress',
    [CardStatus.InReview]: 'In Review',
    [CardStatus.Done]: 'Done',
}

export const ColumnBoard: React.FC<ColumnBoardProps> = ({ status }) => {
    const {cards} = useCardStore()
    const {selectedUsers} = useSelectedUserStore()
    const {searchQuery} = useGlobalStore()

    const filteredCards = React.useMemo(() => {
        if (!selectedUsers.length && !searchQuery) {
            return cards
        }

        let filteredCards = cards
        if (selectedUsers.length) {
            filteredCards = filteredCards.filter((card) => selectedUsers.includes(card.assignee))
        }
        if (searchQuery) {
            filteredCards = filteredCards.filter((card) => (card.title.toLowerCase()).includes(searchQuery.toLocaleLowerCase()))
        }
        return filteredCards;
    }, [cards, selectedUsers, searchQuery]);

    const cardsForThisColumn = React.useMemo(() => {
        return filteredCards.filter((card) => card.status === status)
    }, [filteredCards, status]);

    return (
        <ColumnBoardContainer>
            <ColumnBoardHeader>
                <ColumnBoardTitle>{`${mapToStatus[status]} (${cardsForThisColumn.length}/${cards.length})`}</ColumnBoardTitle>
            </ColumnBoardHeader>
            <ColumnBoardBody>
                {
                    cardsForThisColumn.map((card) => (
                        <CardComponent key={card.id} card={card} />
                    ))
                }
            </ColumnBoardBody>
        </ColumnBoardContainer>
    )
}