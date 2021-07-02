
import { useHistory } from 'react-router-dom'
import { Button } from '../Button'
import { RoomCode } from '../RoomCode'
import { database } from '../../services/firebase'
import imageDelete from '../../assets/images/delete.svg'
import styles from './styles.module.scss'
import toast from 'react-hot-toast'

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

    const handleDeleteRoom = async (roomCode: string) => {
        await database.ref(`rooms/${roomCode}`).remove()
        toast('Sala excluida!')
    }

    return (
        <div className={styles.list}>
            {
                rooms?.map(room => (
                    <div key={room.id} className={styles.card}>
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
                            <button onClick={() => handleDeleteRoom(room.id)} className={styles.delete}>
                                <img src={imageDelete} alt="Delete" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}