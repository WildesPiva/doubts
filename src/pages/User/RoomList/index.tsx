
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { useEffect } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext'

import { Toast } from '../../../components/Toast'
import { TopBar } from '../../../components/TopBar'
import { Button } from '../../../components/Button'
import { ListRooms } from '../../../components/ListRooms'
import { database } from '../../../services/firebase'

import styles from './styles.module.scss'


type FirebaseRoomsProps = Record<string, {
    authorId: string
    endedAt: string
    title: string
}>

type RoomType = {
    id: string
    authorId: string
    endedAt: string
    title: string
}

export function RoomsList() {
    const { user } = useAuthContext()
    const history = useHistory()
    const [rooms, setRooms] = useState<RoomType[]>()

    useEffect(() => {
        if (!user) return

        const roomRef = database.ref(`/rooms`)
        roomRef.orderByChild('authorId').equalTo(user.id).once("value", room => {
            const databaseRoom = room.val()
            const firebaseRooms: FirebaseRoomsProps = databaseRoom ?? {}
            const parsedRooms = Object.entries(firebaseRooms).map((([key, value]) => ({
                id: key,
                authorId: value.authorId,
                endedAt: value.endedAt,
                title: value.title
            })))
            console.log(parsedRooms)
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
                <aside>
                    <p>Acessadas recentemente</p>
                    <ListRooms />
                </aside>
                <aside>
                    <p>Criadas por mim</p>
                    <ListRooms rooms={rooms} />
                </aside>
            </main>
        </div>
    )
}