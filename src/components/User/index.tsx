import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from "../../contexts/AuthContext"
import { Button } from '../Button'
import styles from './styles.module.scss'


export const User = () => {
    const history = useHistory()
    const { user, signOutFirebase } = useAuthContext()
    const { buttonProps, isOpen } = useDropdownMenu(2);

    const handleLogout = async () => {
        await signOutFirebase()
        history.push('/')
    }

    return (
        <div className={styles.user}>
            <button {...buttonProps} >
                <img src={user?.avatar} alt="User" />
            </button>

            <div className={`${styles.menu} ${isOpen ? styles.visible : styles.invisible}`}>
                <img src={user?.avatar} alt="User" />
                <span>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </span>
                <Button outline onClick={handleLogout}>Sair</Button>
            </div>
        </div>
    )

}