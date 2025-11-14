import * as React from 'react'
import styled from 'styled-components'
import { CardStatus } from '../../TeamBoard.types'
import { ColumnBoard } from './ColumnBoard'

const BoardContainer = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    height: 100%;
    overflow-x: auto;
`;

export const Board: React.FC = () => {
    const allStatus = Object.values(CardStatus)

    return (
        <BoardContainer>
            {
                allStatus.map((status) => (
                    <ColumnBoard key={status} status={status} />
                ))
            }
        </BoardContainer>
    )
}