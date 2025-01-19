import styles from './Header.module.css'
function Header(){

    return(
        <header>
           <h1 className={styles.head1}>
            <span>
            <span  style={{ color: 'red' }}> M</span>
            <span  style={{ color: 'white' }}>L</span>
            <span  style={{ color: 'blue' }}>B</span>
            <span  style={{ color: 'black' }}> VisionBase</span>
            </span>
            </h1>
            <nav className= {styles.navbar}>
                <ul>
                    <li><a href = "#">Home</a></li>
                    <li><a href = "#">About</a></li>
                    <li><a href = "#">Service</a></li>
                    <li><a href = "#">Contact</a></li>

                </ul>
                
            </nav>
            <hr></hr>
        </header>

    );
} 

export default Header