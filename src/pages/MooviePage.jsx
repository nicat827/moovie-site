import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import "../assets/styles/MooviePage.css"
import Layout from '../Layout';
import MoovieCard from '../components/MoovieCard';

const MooviePage = () => {
    const [loader, setLoader] = useState(false)
    const [moovie, setMoovie] = useState(null)
    const location = useLocation()
    const id = location.pathname.slice(9)
    console.log(id)

    const getMoovie = async () => {
        try {
            setLoader(true)

            const response = await axios.get(`https://api.tvmaze.com/shows/${id}`)

            setMoovie(response.data)

        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        getMoovie();
    }, [])

    return (
        <>
            {loader || !moovie
                ?
                <div className='moovie-main'>
                    <div className="spinner-border text-danger p-4" role="status" />
                </div>
                :
                <Layout>
                    <div className='moovies'>
                        <div className='first-div'>
                            <MoovieCard hasFlag={true} isLarge={true} height="360px" moovie={moovie} width="18rem" />
                            
                            <div className='moovie-info'>
                            <p className='summary'><b className='movie-name' style={{fontWeight:"800"}}>{moovie.name} </b>{moovie.summary.slice(moovie.summary.indexOf("</b>") + 4, moovie.summary.length -4)}</p>
                                <h4 className='movie-info-descr'>Genres: <span className='info-span'>{moovie.genres.map(genre=> `${genre} `)}</span></h4>
                                <h4 className='movie-info-descr'>Schedule: <span className='info-span'>{moovie.schedule.time} {moovie.schedule.days.map(day=> `${day} `)} ( {moovie.runtime}min )</span></h4>
                                <h4 className='movie-info-descr'>Premiered: <span className='info-span'>{moovie.premiered}</span></h4>
                                <h4 className='movie-info-descr'>Ended: <span className='info-span'>{moovie.ended}</span></h4>
                                
                            </div>
                        </div>
                    </div>
                </Layout>

            }
        </>
    );
}

export default MooviePage;
