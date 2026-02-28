import { Link, Links } from "react-router-dom"
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import cart from '../../assets/cart.png';
import styles from './console.module.css';

export default function Header(){
    return(
        <header className={styles.tudo}>
            <div className={styles.logo}>
                <Link to='/home'> <img src={logo} alt="logo da empresa"/> </Link>
            </div>
            <div className={styles.botoes}>
            <Link to="/">
                    <div className={styles.perfil}>
                    <img src={profile} alt="ícone do perfil"/>
                    </div>
                </Link>
                <Link to="#">
            <div className={styles.cart}>
                <img src={cart} alt="ícone do carrinho"/>
                </div>
                </Link>
            </div>
        </header>
    )
}