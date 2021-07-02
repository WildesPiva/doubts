// import ReactTooltip from 'react-tooltip'
import toast from 'react-hot-toast';

import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'

import { LikeButton } from '../../components/LikeButton'
import { Toast } from '../../components/Toast'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'
import { TopBar } from '../../components/TopBar'

import { database } from '../../services/firebase'
import { useRoom } from '../../hooks/useRoom';

import styles from './styles.module.scss'

type RoomParams = {
    id: string
}

export function Room() {
    const { user, signInWithGoogle } = useAuthContext()
    // const history = useHistory()
    const [newQuestion, setNewQuestion] = useState('')
    const params = useParams<RoomParams>()
    const roomCode = params.id
    const { questions, title, endedAt } = useRoom(roomCode)

    async function handleLogin() {

        if (!user) {
            await signInWithGoogle()
        }

        toast.success("Login com sucesso!")
    }

    async function handleSendNewQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            toast("Ei! Escreva algo para enviar!")
            return
        }

        if (!user) {
            toast("Você precisa estar logado!")
            return
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomCode}/questions`).push(question)

        setNewQuestion('')

        toast.success("Uhuuu! Sua pergunta foi enviada!")
    }

    async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
        if (likeId) {
            await database.ref(`rooms/${roomCode}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            await database.ref(`rooms/${roomCode}/questions/${questionId}/likes`).push({
                authorId: user?.id
            })
        }
    }

    return (
        <div className={styles.pageRoom}>
            <Toast />
            <TopBar>
                <RoomCode code={roomCode} disabled={Boolean(endedAt)} />
            </TopBar>
            <main>
                <div className={styles.roomTitle}>
                    <h1>{title}</h1>
                    {(questions && questions.length > 0) && (
                        <span>{questions.length} pergunta{(questions.length > 1) && ('s')}</span>
                    )}
                    {endedAt && <span className={styles.closed}>{`Sala encerrada em ${new Date(endedAt).toLocaleString()}`}</span>}
                </div>
                <form onSubmit={handleSendNewQuestion}>
                    <textarea
                        value={newQuestion}
                        disabled={!user || Boolean(endedAt)}
                        onChange={event => setNewQuestion(event.target.value)}
                        placeholder="O que você quer perguntar" />
                    <div className={styles.formFooter}>

                        {(user) ? (
                            <div className={styles.userInfo} data-tip="hello world">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta, <button
                                    type="button"
                                    onClick={handleLogin}>
                                    faça seu login
                                </button>
                            </span>
                        )}

                        <Button type="submit" disabled={!user || Boolean(endedAt)}>Enviar pergunta</Button>
                    </div>
                </form>
                <div className={styles.questionList}>
                    {
                        questions.map(question => (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >

                                <LikeButton
                                    disabled={question.isAnswered || Boolean(endedAt) || !user}
                                    hasLiked={Boolean(question.likeId)}
                                    count={question.likeCount}
                                    onClick={() => handleLikeQuestion(question.id, question.likeId)} />

                            </Question>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}