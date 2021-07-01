import { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { ButtonHTMLAttributes } from 'react'
import copyImage from '../../assets/images/copy.svg'
import styles from './styles.module.scss'

type RoomCodeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    code: string
}

export function RoomCode({ code, ...props }: RoomCodeProps) {
    const [tooltip, setTooltop] = useState('Copiar para área de transferência')

    function copyRoomCodeToClipboard() {
        setTooltop('Copiado')
        navigator.clipboard.writeText(code)
        setTimeout(() => setTooltop('Copiar para área de transferência'), 1000)
    }

    return (<>
        <ReactTooltip />
        <button data-tip={tooltip} className={styles.roomCode} onClick={copyRoomCodeToClipboard} {...props}>
            <div>
                <img src={copyImage} alt="Copy room code" />
            </div>
            <span> Sala #{code}</span>
        </button>
    </>)
}