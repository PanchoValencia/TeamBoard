import * as React from 'react'
import styled from 'styled-components'
import { FormWrapper } from '../../Components/FormWrapper/FormWrapper'
import { Stack } from '../../Components/Stack/Stack'
import { useCardStore } from '../../Store/CardsStore'
import { useGlobalStore } from '../../Store/GlobalStore'
import { Card, CardStatus } from '../../TeamBoard.types'
import { TextInput } from '../../Components/TextInput/TextInput'
import { Button } from '../../Components/Button/Button'
import { Select } from '../../Components/Select/Select'
import { useUserStore } from '../../Store/UsersStore'

const ManageCardModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

interface ManageCardModalProps {
    readonly cardId?: string
}

export const ManageCardModal: React.FC<ManageCardModalProps> = ({ cardId }) => {
    const {cards, addCard, updateCard } = useCardStore()
    const {users} = useUserStore()
    const {closeModal} = useGlobalStore()
    const currentCard = cards.find((card: Card) => card.id === cardId)
    const isEdit = Boolean(currentCard);

    const [title, setTitle] = React.useState(currentCard?.title || '')
    const [description, setDescription] = React.useState(currentCard?.description || '')
    const [assignee, setAssignee] = React.useState(currentCard?.assignee || users[0]?.id)

    const isDisabled = React.useMemo(() => {
        return !title || !description || !assignee;
    }, [title, description, assignee]);

    const handleSave = () => {
        if (isEdit) {
            updateCard({
                id: currentCard!.id,
                title,
                description,
                status: currentCard!.status,
                assignee,
                dueDate: currentCard!.dueDate,
                createdAt: currentCard!.createdAt,
            })
        } else {
            addCard({
                id: cards.length ? String(Number(cards[cards.length - 1].id) + 1) : '1',
                title,
                description,
                status: CardStatus.ToDo,
                assignee,
                createdAt: new Date(),
            })
        }
        closeModal()
    }

    return (
        <FormWrapper title={isEdit ? 'Edit Card' : 'Add Card'}>   
            <Stack space="xlarge">
                <Stack>
                    <TextInput label="Title" value={title} onChange={setTitle} placeholder="Add title" />
                    <TextInput label="Description" value={description} onChange={setDescription} placeholder="Add description" />
                    <Select label="Assignee" value={assignee} onChange={(value) => setAssignee(value)} options={users.map((user) => ({ label: user.name, value: user.id }))} />
                </Stack>
                <ManageCardModalFooter>
                    <Button forceLightColor onClick={closeModal}>Cancel</Button>
                    <Button forceLightColor onClick={handleSave} isDisabled={isDisabled}>Save</Button>
                </ManageCardModalFooter>
            </Stack>
        </FormWrapper>
    )
}