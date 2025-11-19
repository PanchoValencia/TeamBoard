import * as React from 'react'
import styled from 'styled-components'
import { Card } from '../../TeamBoard.types'
import { Avatar } from '../Avatar/Avatar';
import { useUserStore } from '../../Store/UsersStore'

const CardContainer = styled.div`
    border-radius: 5px;
    padding: 1rem;
    color: var(--foreground);
    border: 1px solid var(--border);
    background-color: var(--background);
    cursor: pointer;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    &:hover {
        border-color: var(--primary);
    }
`;

const CardTitle = styled.h3`
    font-size: 1rem;
    margin: 0;
`;

const CardDescription = styled.p`
    font-size: 0.8rem;
    margin: 0;
`;

interface CardProps {
    readonly card: Card
    readonly onClick: () => void
}

export const CardComponent: React.FC<CardProps> = ({ card, onClick }) => {
    const {users} = useUserStore()
    const user = users.find((user) => user.id === card.assignee)

    return (
        <CardContainer onClick={onClick}>
            <div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description?.trim() || 'No description'}</CardDescription>
            </div>
            <Avatar name={user?.name || '--'} isSmall />
        </CardContainer>
    )
}