import { useHistory } from 'react-router-dom'
import logoImage from '../../../assets/images/logo.png'

import styles from './styles.module.scss'

export function NotFound() {
    const history = useHistory()

    return (
        <main className={styles.pageNotFound}>
            <h1>404</h1>
            <img src={logoImage} alt="Logo Let Me Ask" onClick={() => history.push('/')} />
            <p>Não encontramos sua pagina, clique no logo para voltar para o incio.</p>
        </main>
    )
}