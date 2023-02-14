import styles from '@/styles/navbar.module.css'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Navbar() {
      const { data: session } = useSession()


    return (
    <>
            <nav className={styles.nav}>
            <div className={styles.right}>
            <h1>GjesteBok!</h1>
                </div>
                


        <div className={styles.right}>
        {!session && (
            <button
            className={styles.logButton}
            type="button"
            onClick={() => signIn()}
            >
            Logg inn
            </button>
        )}
                

        {session && (
            <>   
                <p> Logget inn som: {session.user?.name}</p>
                <button
                  className={styles.logButton}
                  type="button"
                  onClick={() => signOut()}
                >
                  Logg ut
                </button> 
            </>
        )}
            </div>
        </nav>
    </>
    )
}