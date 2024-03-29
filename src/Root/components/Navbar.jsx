import { Link, NavLink } from 'react-router-dom';
import userDefaultPic from '../../assets/user.png';
import logoLight from '../../assets/BookPalLogoLightTheme.png'
import logoDark from '../../assets/BookPalLogoDarkTheme.png'
import { AuthContext } from '../../auth/AuthProvider';
import { useContext } from 'react';
import { BiSolidMoon, BiMoon } from 'react-icons/bi';
import PropTypes from 'prop-types';

const Navbar = ({ theme, setTheme }) => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch();
    }
    const links = <>
        {
            user &&
            <>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/addBook'>Add Book</NavLink></li>
                <li><NavLink to='/books'>All Books</NavLink></li>
                <li><NavLink to='/borrowedBooks'>Borrowed Books</NavLink></li>
            </>
        }
    </>


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                        {
                            user ?
                                <li className='pl-3' onClick={handleSignOut}>Sign Out</li>
                                :
                                <>
                                    <li><NavLink to='/login'>Login</NavLink></li>
                                    <li><NavLink to='/signUp'>Sign Up</NavLink></li>
                                </>
                        }
                    </ul>
                </div>
                <Link to='/'>
                    <div className='flex items-center'>
                        { theme?
                            <img className='h-20 w-20' src={logoLight} alt="" />
                            :
                            <img className='h-20 w-20' src={logoDark} alt="" />
                        }
                        <h3 className='text-4xl font-bold text-neutral'>B<span className='text-secondary'>oo</span>k<span className='text-primary'>Pal</span></h3>
                    </div>
                </Link>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {links}
                </ul>
            </div>
            <div className='navbar-end'>
                {
                    user ?
                        <div className="flex flex-row-reverse md:flex-row gap-2 items-center">
                            <p className="absolute md:static invisible md:visible text-lg text-darkGreen font-semibold">{user.displayName}</p>
                            {user.photoURL ?
                                <img className="w-[40px] h-[40px] rounded-full" src={`${user.photoURL}`} referrerPolicy="no-referrer" alt="" />
                                :
                                <img className="w-[40px] h-[40px] rounded-full" src={userDefaultPic} alt="" />
                            }
                            <button onClick={handleSignOut} className="btn btn-ghost invisible md:visible p-0">Sign Out</button>
                        </div>
                        :
                        <div className='invisible md:visible'>
                            <Link to='/login' className="btn btn-ghost">Login</Link>
                            <Link to='/signUp' className="btn btn-ghost">Sign UP</Link>
                        </div>
                }
                <span onClick={() => setTheme(!theme)}>
                    {
                        theme ?
                            <BiSolidMoon className='w-10 text-3xl'></BiSolidMoon>
                            :
                            <BiMoon className='w-10 text-3xl'></BiMoon>
                    }
                </span>
            </div>
        </div>
    );
};
Navbar.propTypes = {
    theme: PropTypes.bool.isRequired,
    setTheme: PropTypes.func.isRequired,
}

export default Navbar;