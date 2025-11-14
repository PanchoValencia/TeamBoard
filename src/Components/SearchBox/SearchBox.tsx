import * as React from 'react'
import styled from 'styled-components'

const SearchBoxContainer = styled.div`
    gap: 1rem;
    width: 250px;
    height: 40px;
    border: 1px solid var(--border);
    color: var(--foreground);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem 1rem;

    input {
        border: none;
        outline: none;
        font-size: 1rem;
        height: 100%;
        flex: 1;
        background-color: transparent;
        color: var(--foreground);
    }

    button {
        position: relative;
        width: 24px;
        height: 24px;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;

        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 2px;
            transform-origin: center;
            transition: 0.2s ease;
            background-color: var(--foreground);
        }

        &::before {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }
`;

interface SearchBoxProps {
    value: string
    onSearch: (query: string) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch }) => {
    return (
        <SearchBoxContainer>
            <input type="text"
            value={value} onChange={(e) => onSearch(e.target.value)} placeholder="Search board" />
            {
                value ? (
                    <button onClick={() => onSearch('')} />
                ) : null
            }
        </SearchBoxContainer>
    )
}