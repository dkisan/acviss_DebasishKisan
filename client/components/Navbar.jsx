import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem('userToken')
        navigate('/')
    }


    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Welcome
                        <span
                            style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px', textTransform:'uppercase' }}
                        >{localStorage.getItem('userName')}</span></Link>
                </li>
                <li>
                    <button onClick={logoutHandler} className='logout-btn'>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;