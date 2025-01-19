import styles from './Header.module.css'
function Header(){

    return(
        <header className={styles.header}>
           <a href="/" className={styles.logo}>
            <span>
                <span  style={{ color: 'red' }}> M</span>
                <span  style={{ color: 'white' }}>L</span>
                <span  style={{ color: 'blue' }}>B</span>
                <span  style={{ color: 'black' }}> VisionBase</span>
            </span>
           </a>
            <nav className= {styles.navbar}>
                
                    <a href = "/">Home</a>
                    <a href = "/">About</a>
                    <a href = "/">Service</a>
                    <a href = "/">Contact</a>   
            </nav>
        </header>

    );
} 

export default Header