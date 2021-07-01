import toast from 'react-hot-toast';

// import { FormEvent, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import deleteImage from '../assets/images/delete.svg'
import checkImage from '../assets/images/check.svg'
import answerImage from '../assets/images/answer.svg'
import { database } from '../services/firebase'

import { Toast } from '../components/Toast'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'
import { TopBar } from '../components/TopBar'

import styles from '../styles/room.module.scss'
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string
}

export function AdminRoom() {
    const history = useHistory()
    const params = useParams<RoomParams>()
    const roomCode = params.id
    const { questions, title, endedAt, isAdmin } = useRoom(roomCode)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomCode}`).update({
            endedAt: new Date()
        })
        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja exluir a pergunta')) {
            await database.ref(`rooms/${roomCode}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomCode}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomCode}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    return (
        <div className={styles.pageRoom}>
            <Toast />
            <TopBar>
                <div>
                    <RoomCode code={roomCode} disabled={Boolean(endedAt)} />
                    <Button disabled={Boolean(endedAt)} onClick={handleEndRoom} outline>
                        Encerrar sala
                    </Button>
                </div>
            </TopBar>
            <main>
                <div className={styles.roomTitle}>
                    <h1>{title}</h1>
                    {(questions && questions.length > 0) && (
                        <span>{questions.length} pergunta{(questions.length > 1) && ('s')}</span>
                    )}
                    {endedAt && <span className={styles.closed}>{`Sala encerrada em ${new Date(endedAt).toLocaleString()}`}</span>}
                </div>

                <div className={styles.questionList}>
                    {questions.length === 0 && (
                        <div className={styles.noQuestions}>
                            <h2>
                                Compartilhe o codigo da sala com os convidados
                            </h2>
                            <h2>
                                Nada ainda, mas fique atento logo você receberá perguntas!
                            </h2>
                        </div>
                    )}
                    {
                        questions.map(question => (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {(!question.isAnswered) && (<>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                    >
                                        <img src={checkImage} alt="Marcar pergunta como respondida" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerImage} alt="Destacar pergunta" />
                                    </button>
                                </>)}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImage} alt="Remover pergunta" />
                                </button>
                            </Question>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}