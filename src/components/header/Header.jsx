import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import styles from "./Header.module.css"
import axios from 'axios';
import { MooviesContext } from '../../context';
const Header = () => {
    const mooviesMatch = useMatch("/moovies")
    const profileMatch = useMatch("/profile")
   
  
    const {searchValue, setSearchValue} = useContext(MooviesContext)




    return (
        <header >
            

                <NavLink className={styles.logoLink} to={"/"}>
                <svg className={styles.filmLogo} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path  className={styles.filmLogoPath} d="M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146 272q66 0 121.5-35.5T682-393h-52q-23 40-63 61.5T480.5-310q-46.5 0-87-21T331-393h-53q26 61 81 96.5T480-261Zm0 181q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                    <span style={{marginBottom:"22px"}}>moovie house</span></NavLink>
            
                <div className={styles.navEnd}>
                    <div className={styles.inpWrapper}>
                        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}  disabled={  mooviesMatch || profileMatch && localStorage.getItem("user") && localStorage.getItem("fav") && (JSON.parse(localStorage.getItem("fav")).length > 0) ? false : true} placeholder=' Search moovie' className={mooviesMatch || profileMatch && localStorage.getItem("user") && localStorage.getItem("fav") && (JSON.parse(localStorage.getItem("fav")).length > 0) ? styles.searchInp : styles.searchInpDis} />
                        <svg className={mooviesMatch ? styles.searchIcon : styles.searchIconDis} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M783.522-110.913 529.848-364.587q-29.761 23.044-68.642 36.565-38.88 13.522-83.119 13.522-111.152 0-188.326-77.174Q112.587-468.848 112.587-580q0-111.152 77.174-188.326Q266.935-845.5 378.087-845.5q111.152 0 188.326 77.174Q643.587-691.152 643.587-580q0 44.478-13.522 83.12-13.521 38.641-36.565 68.163l253.913 254.152-63.891 63.652ZM378.087-405.5q72.848 0 123.674-50.826Q552.587-507.152 552.587-580q0-72.848-50.826-123.674Q450.935-754.5 378.087-754.5q-72.848 0-123.674 50.826Q203.587-652.848 203.587-580q0 72.848 50.826 123.674Q305.239-405.5 378.087-405.5Z"/></svg>
                    </div>
                    
                    <NavLink onClick={() => setSearchValue("")} className={mooviesMatch ? styles.active : styles.link}  to="/moovies">Moovies</NavLink>
                    {!localStorage.getItem("user") ?
                    <>
                    <NavLink className={(state) => state.isActive ? styles.active : styles.link} to="/login">Login</NavLink>
                    <NavLink className={(state) => state.isActive ? styles.active : styles.link} to="/register">Register</NavLink>
                    </>
                    : <NavLink onClick={() => setSearchValue("")} className={(state) => state.isActive ? styles.active : styles.link} to="/profile">{(JSON.parse(localStorage.getItem("user")).username)}</NavLink>
                    }
                    
                </div>
               
        </header>
    );
}

export default Header;
