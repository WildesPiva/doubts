
import { useHistory } from 'react-router-dom'
import { Button } from '../Button'
import { RoomCode } from '../RoomCode'

import styles from './styles.module.scss'

type RoomType = {
    id: string
    authorId: string
    endedAt: string
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
                        <p>{room.title}</p>
                        <div>
                            {/* <p>Sala encerrada: 18/14/2121 18:32:00</p> */}
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