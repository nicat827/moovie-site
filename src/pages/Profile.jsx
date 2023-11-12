import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout';
import "../assets/styles/Profile.css"
import MoovieCard from '../components/MoovieCard';
import { MooviesContext } from '../context';
import { Link } from 'react-router-dom';
const Profile = () => {

    const [favShows, setFavShows] = useState([])



    const {searchValue, setSearchValue} = useContext(MooviesContext)

   

    useEffect(() => {
        if (!searchValue) {
            setFavShows(JSON.parse(localStorage.getItem("fav")))
        }

        else {
            const favCards = JSON.parse(localStorage.getItem("fav"))
            const newArr = [];
            if (favCards) {
                favCards.forEach((card) => {
                    if (card.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())) {
                        newArr.push(card)
                    }
                 })
    
                 setFavShows(newArr)
            }
           
             
             
             
        }


    } ,[searchValue])



    return (
        <Layout>
            <div className='profile'>
                
                {favShows && favShows.length ?
                <div className='favShows-list'>
                    {favShows.map((show) => 
                    <MoovieCard setFavShows={setFavShows} key={show.id} isLarge={true} width="17rem" hasFlag={true} moovie={show} />
                    )}
                </div>
                : <div className='empty-favList'>
                    <h1>Your favorite list is empty! :(</h1>
                    <Link onClick={() => setSearchValue("")} to="/moovies" className='go-to-btn'>Go to Moovies!</Link>
                </div>
                }
            </div>
        </Layout>
        
    );
}

export default Profile;
