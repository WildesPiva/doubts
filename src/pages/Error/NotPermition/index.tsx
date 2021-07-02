import { useHistory } from 'react-router-dom'
import logoImage from '../../../assets/images/logo.png'

import styles from './styles.module.scss'

export function NotPermition() {
    const history = useHistory()

    return (
        <main className={styles.pageNotFound}>
            <h1>Você não tem permissão para isso!</h1>
            <img src={logoImage} alt="Doubts" onClick={() => history.push('/')} />
            <p> clique no logo para voltar para o incio.</p>
        </main>
    )
}