import { CardStatus } from './TeamBoard.types'

export const mapToStatus: Record<CardStatus, string> = {
    [CardStatus.ToDo]: 'To Do',
    [CardStatus.InProgress]: 'In Progress',
    [CardStatus.InReview]: 'In Review',
    [CardStatus.Done]: 'Done',
}