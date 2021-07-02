
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'

import { Toast } from '../../../components/Toast'
import { TopBar } from '../../../components/TopBar'
import { Button } from '../../../components/Button'
import { ListRooms } from '../../../components/ListRooms'
import { database } from '../../../services/firebase'

import emptyImage from '../../../assets/images/empty-questions.svg'

import styles from './styles.module.scss'


type FirebaseRoomsProps = Record<string, {
    authorId: string
    endedAt: string
    title: string
}>

type RoomType = {
    id: string
    authorId: string
    endedAt: Date
    title: string
}

export function RoomsList() {
    const { user } = useAuthContext()
    const history = useHistory()
    const [rooms, setRooms] = useState<RoomType[]>()

    useEffect(() => {
        if (!user) return

        const roomRef = database.ref(`/rooms`)
        roomRef.orderByChild('authorId').equalTo(user.id).on("value", room => {
            const databaseRoom = room.val()
            const firebaseRooms: FirebaseRoomsProps = databaseRoom ?? {}
            const parsedRooms = Object.entries(firebaseRooms).map((([key, value]) => ({
                id: key,
                authorId: value.authorId,
                endedAt: new Date(value.endedAt),
                title: value.title
            })))
            // console.log(parsedRooms)
            setRooms(parsedRooms)
        })

        return () => { roomRef.off("value") }

    }, [user])

    return (
        <div className={styles.pageRoom}>
            <Toast />
            <TopBar>
                <Button outline onClick={() => history.push('/user/rooms/new')}>Criar sala</Button>
            </TopBar>
            <main>
                <h1>Suas salas</h1>
                {/* 
                <aside>
                    <p>Acessadas recentemente</p>
                    <ListRooms />
                </aside> 
                */}
                {
                    rooms?.length !== 0 ?
                        <aside>
                            <p>Criadas por mim</p>
                            <ListRooms rooms={rooms} />
                        </aside>
                        :
                        <aside className={styles.emptyRoom}>
                            <img src={emptyImage} alt="Sala vazia" />
                            <h2>Não há salas ainda</h2>
                            <p>Após criar elas aparecerão aqui</p>
                        </aside>
                }
            </main>
        </div>
    )
}