
import { useHistory } from 'react-router-dom'
import { Button } from '../Button'
import { RoomCode } from '../RoomCode'

import styles from './styles.module.scss'

type RoomType = {
    id: string
    authorId: string
    endedAt: Date
    title: string
}

type ListRoomsProps = {
    rooms?: RoomType[]
}

export const ListRooms = ({ rooms }: ListRoomsProps) => {
    const history = useHistory()

    return (
        <div className={styles.list}>
            {
                rooms?.map(room => (
                    <div key={room.id}>
                        <div>
                            <p>{room.title}</p>
                            <span> {
                                String(room.endedAt) !== 'Invalid Date'
                                    ? `Finalizada em: ${room.endedAt.toLocaleString()}`
                                    : ''
                            } </span>
                        </div>
                        <div>
                            <RoomCode code={room.id} />
                            <Button
                                outline
                                onClick={() => history.push(`/user/rooms/${room.id}`)}
                            >Entrar </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}