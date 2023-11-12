import React, { useMemo } from 'react';
import "../assets/styles/Moovies.css"
import { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const MoovieCard = ({ moovie, width, setFavShows, isLarge = false, hasFlag = false }) => {

    const navigate = useNavigate()
    const match = useMatch("/profile")
    const [fill, setFill] = useState(false)
    
    const [added, setAdded] = useState(false)

    const [showAlert, setShowAlert] = useState(false)

    const fav = JSON.parse(localStorage.getItem("fav"))
    let favId = []
    if (fav) {
        favId = fav.map((obj) => obj.id)
    }
    
    

    return (
        <>
        {showAlert && added && <div className='alert succ'>Succesfully added to favorite!</div>}
        {showAlert && !added && <div className='alert errAl'>Succesfully removed from favorites!</div>}
       
        <div className="card custom-card" style={{ width: width }}>
            
            <div onClick={() => !isLarge && navigate(`/moovies/${moovie.id}`)} className='img-wrapper'>
                <img style={{ maxHeight: "460px" }} src={moovie.image ? moovie.image.medium : require("../assets/img/none-img.png")} className="card-img-top" alt="..." />
                {!isLarge ?
                    <PlayArrowIcon className='play-icon' />
                    :
                    <Link to={moovie.officialSite} className='go-to-link'>Go to official site</Link>
                }

            </div>

            <div className="card-body custom-body">
                <h5 className="card-title" style={{ color: "white", fontWeight: "500", textAlign: "center" }}>{moovie.name}</h5>
                <div className='card-footer'>
                    <div style={{ marginTop: "15px", display: "flex", width: "100%", justifyContent: "space-between" }}>
                        {localStorage.getItem("user") ?
                            !fill && !favId.includes(moovie.id) ?

                                <svg onMouseEnter={() => setFill(true)} style={{ width: "30px", height: "30px", cursor: "pointer", fill: "red" }} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill='rgb(158,0,0)' d="m479.761-109-63.5-57.022q-101.957-91.717-168.555-158.434-66.597-66.718-105.717-119.816-39.12-53.098-54.74-97.815Q71.63-586.804 71.63-634q0-97.576 65.329-162.973 65.328-65.397 162.802-65.397 51.744 0 98.513 21.044 46.769 21.043 81.487 59.847 34.717-38.804 81.486-59.847 46.769-21.044 98.514-21.044 97.678 0 163.143 65.397Q888.37-731.576 888.37-634q0 46.957-15.5 91.674-15.5 44.717-54.739 97.696-39.24 52.978-105.957 119.815-66.717 66.837-168.913 158.793L479.761-109Zm0-122.587q95.522-86 157.163-146.902 61.641-60.902 97.282-106.044 35.642-45.141 49.403-80.078 13.761-34.938 13.761-69.383 0-59.049-39.284-98.212-39.284-39.164-98.21-39.164-46.159 0-85.68 26.5-39.522 26.5-54.522 67.5h-79.587q-14.887-41-54.585-67.5t-85.676-26.5q-58.696 0-97.826 39.164-39.13 39.163-39.13 98.206 0 34.703 13.866 69.901 13.866 35.198 49.521 80.312 35.656 45.113 97.058 105.896 61.402 60.782 156.446 146.304Zm.478-269.891Z" /></svg>
                                :
                                <svg onClick={() => {
                                    if (!favId.includes(moovie.id)) {
                                        
                                        setAdded(true)
                                        let fav = JSON.parse(localStorage.getItem("fav"))
                                        if (!fav) {
                                            localStorage.setItem("fav", JSON.stringify([moovie]))
                                        }

                                        else {
                                            
                                            fav = [...fav, moovie]
                                            localStorage.setItem("fav", JSON.stringify(fav))
                                         
                                           
                                        }
                                        setShowAlert(true)
                                        setTimeout(() => setShowAlert(false), 2000)
                                    }
                                    else {
                                        setAdded(false)
                                        let fav = JSON.parse(localStorage.getItem("fav"))
                                        fav = fav.filter((el) => {
                                        
                                            return moovie.id != el.id
                                        })
                                        localStorage.setItem("fav", JSON.stringify(fav))
                                        if (match) {
                                            setFavShows(JSON.parse(localStorage.getItem("fav")))
                                        }
                                       

                                        setShowAlert(true)
                                        
                                            setTimeout(() => setShowAlert(false), 2000)
                                        
                                        
                                    }
                                    
                                }}  onMouseLeave={() => setFill(false)} className='like-icon' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path className='path-like-icon' d="m479.761-109-63.5-57.022q-101.957-91.717-168.555-158.434-66.597-66.718-105.717-119.816-39.12-53.098-54.74-97.815Q71.63-586.804 71.63-634q0-97.587 65.272-162.978 65.272-65.392 162.859-65.392 51.761 0 98.522 21.044 46.76 21.043 81.478 59.847 34.717-38.804 81.478-59.847Q608-862.37 659.761-862.37q97.587 0 163.098 65.392Q888.37-731.587 888.37-634q0 46.957-15.5 91.674-15.5 44.717-54.739 97.696-39.24 52.978-105.957 119.815-66.717 66.837-168.913 158.793L479.761-109Z" /></svg>


                            :

                            <svg disabled className='disabled' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path className='path-like-icon' d="m479.761-109-63.5-57.022q-101.957-91.717-168.555-158.434-66.597-66.718-105.717-119.816-39.12-53.098-54.74-97.815Q71.63-586.804 71.63-634q0-97.587 65.272-162.978 65.272-65.392 162.859-65.392 51.761 0 98.522 21.044 46.76 21.043 81.478 59.847 34.717-38.804 81.478-59.847Q608-862.37 659.761-862.37q97.587 0 163.098 65.392Q888.37-731.587 888.37-634q0 46.957-15.5 91.674-15.5 44.717-54.739 97.696-39.24 52.978-105.957 119.815-66.717 66.837-168.913 158.793L479.761-109Z" /></svg>


                        }






                        <div style={{ display: "flex", alignItems: "center" }}>
                            {hasFlag 
                            ?  
                                moovie.language == "English"
                                ? 
                                <img style={{width:"30px", height:"30px", marginRight:"10px"}} src={require("../assets/img/english.png")} /> 
                                :  
                                <img style={{width:"30px", height:"30px", marginRight:"10px"}} src={require("../assets/img/japan.png")} />
                            
                            :
                            null
                            }
                            
                            <svg className='star-icon' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="rgb(206,163,73)" d="m300.456-709.978 112-145q12.957-16.957 30.653-25.055 17.695-8.098 36.891-8.098 19.196 0 36.891 8.098 17.696 8.098 30.653 25.055l112 145 169.76 57q27.914 8.717 43.751 31.771 15.836 23.055 15.836 50.49 0 12.956-3.739 25.793t-12.217 24.554L763.413-364.609l4 163.761q1 37.392-25.032 62.946-26.033 25.554-61.142 25.554-1.761 0-22.239-2.761l-179-49.76-179 49.76q-5.239 2-11.239 2.5-6 .5-11.239.5-34.87 0-60.903-25.673-26.032-25.674-24.793-63.066l4-164.522-109-155q-8.478-11.717-12.217-24.554-3.74-12.837-3.74-25.793 0-26.674 15.457-49.729 15.456-23.054 43.37-32.532l169.76-57Z" /></svg>
                            <span className='rating'>{moovie.rating.average}</span>
                        </div>
                    </div>


                </div>


            </div>
        </div>
        </>
    );
}

export default MoovieCard;
