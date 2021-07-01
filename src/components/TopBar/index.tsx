import { ReactNode } from 'react'
import { useHistory } from 'react-router'

import styles from './styles.module.scss'

import logoImage from '../../assets/images/simple_logo.png'

type TopBarProps = {
    children?: ReactNode
}

export const TopBar = ({ children }: TopBarProps) => {
    const history = useHistory()

    return (
        <header className={styles.topBar}>
            <div className={styles.content}>
                <img src={logoImage} alt="Doubts" onClick={() => history.push('/')} />
                {children}
            </div>
        </header>
    )
}