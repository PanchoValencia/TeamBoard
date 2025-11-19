export enum Roles {
    admin = 'admin',
    member ='member',
}

export enum CardStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    InReview = 'InReview',
    Done = 'Done',
}

export interface Card {
    readonly id: string,
    readonly title: string,
    readonly description?: string,
    readonly status: CardStatus,
    readonly assignee: string,
    readonly createdAt: Date,
}

export interface User {
    readonly id: string,
    readonly name: string,
    readonly password: string,
    readonly email: string,
    readonly role: Roles,
}

export enum ModalIds {
    addUser = 'addUser',
    addCard = 'addCard',
}
