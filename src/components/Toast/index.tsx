import toast, { Toaster, ToastBar } from 'react-hot-toast';
import styles from './styles.module.scss'

export function Toast() {
    return (
        <Toaster toastOptions={{
            style: {
                background: 'var(--background-secondary)',
                color: 'var(--text)'
            }
        }}>
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <button
                                    className={styles.buttonClose}
                                    onClick={() => toast.dismiss(t.id)}>
                                    &#10006;
                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    )
}