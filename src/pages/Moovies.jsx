import React, { createContext, useContext, useRef } from 'react';
import MoovieCard from '../components/MoovieCard';
import ButtonPagination from '../components/ButtonPagination';
import "../assets/styles/Moovies.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from 'react';
import Layout from '../Layout';
import { Alert } from '@mui/material';
import { MooviesContext } from '../context';
import {NotFound} from "../pages/NotFound"

var timer;

const Moovies = () => {
    
    const [allMoovies, setAllMoovies] = useState([]);
    const {moovies, setMoovies} = useContext(MooviesContext)
    const [page, setPage] = useState(1);
    const [pagesArr, setPagesArr] = useState([])
    const [pagesCount, setPagesCount] = useState(0)
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(25)
    const [typing, setTyping] = useState(false)
    const [loader, setLoader] = useState(false)

    const {searchValue, setSearchValue} = useContext(MooviesContext)
   

    const mooviesRef = useRef(null)

    

    const getMoovies = async () => {

        setLoader(true)
       
        try {
            if (searchValue) { 
                const response = await axios.get("http://api.tvmaze.com/search/shows", {params:{q:searchValue}})
                setLoader(false)
                setPagesArr([])
                setAllMoovies(response.data)
                setPage(1)
                setMoovies(response.data.slice(minRange, maxRange))
                setPagesCount(Math.ceil(response.data.length / 25))
                
            }
            else {
                const response = await axios.get("https://api.tvmaze.com/shows")
                setPagesArr([])
                setAllMoovies(response.data)
                setMoovies(response.data.slice(minRange, maxRange))
                
                setPagesCount(response.data.length / 25)
                const page = JSON.parse(localStorage.getItem("page"))
                if (!page) {
                    localStorage.setItem("page", JSON.stringify(1))
                }
                else {
                  setPage(page)  
                }
            }
           
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoader(false)
        }


        
    }
    

    
    useEffect(() => {

        if (!searchValue) {
            setLoader(true)
            window.clearTimeout(timer)
            getMoovies()
        }
        else {
            window.clearTimeout(timer)
            timer = setTimeout(() => {
                
                getMoovies()
            } , 1000)
        }
       
        
        
    
       
    }, [searchValue])


    useEffect(() => {

        if (pagesArr.length < pagesCount) {
            setPagesArr([...pagesArr, pagesArr.length + 1])
        }


    }
        , [pagesCount, pagesArr])




    useEffect(() => {

        setMaxRange(25 * page)


    }, [page])

    useEffect(() => {
        setMinRange(maxRange - 25)
    }, [maxRange])

    useEffect(() => {

        const moovies = allMoovies.slice(minRange, maxRange)
        setMoovies(moovies)
        
        window.scrollTo(0, 0)


    }, [minRange])


    return (

        <>
        
            {loader ?
                <div className='moovies w-100'>
                    <div className="spinner-border text-danger p-4" role="status" />


                </div>
                
                :

                <Layout>

                    <div className='moovies' ref={mooviesRef}>
                        
                       
                            {moovies.length  > 0 ?
                             <div className='moovies-list'>
                                {moovies.map(moovie =>
                                    <MoovieCard  width="13rem" moovie={moovie.show ? moovie.show : moovie} key={moovie.id} />
                                )}    
                            </div>
                            :
                          
                            <div className='not-found'>
                                <h1>404</h1><br/>
                                <h3 style={{marginBottom:'100px'}}>Moovies Not Found</h3>
                            </div>

                            

                            }
                            
                       
                        <div className='pagination-div'>
                            {pagesArr.map((pagee) =>
                                <ButtonPagination setLoader={setLoader} disabled={page == pagee ? true : false} className={page == pagee ? "pagination-button-active" : "pagination-button"} page={page} setPage={setPage} key={pagee}>{pagee}</ButtonPagination>
                            )}
                        </div>
                    </div>


                </Layout>
            }
        </>

    );
}

export default Moovies;
