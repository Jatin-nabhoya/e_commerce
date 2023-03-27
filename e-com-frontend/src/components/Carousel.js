import React, { useState, useEffect } from 'react'

import "../App.css";
import CI1 from "../assets/images/Carousel/1.png"
import CI2 from "../assets/images/Carousel/2.jpg"
import CI3 from "../assets/images/Carousel/3.jpg"

const Carousel = () => {

    let [index, setIndex] = useState(0);
    const slider = [
        (<><div className="single_slider" style={{ backgroundImage: `url(${CI1})` }} >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="slider_content">
                            <p>exclusive offer -20% off this week</p>
                            <h1>Necklace</h1>
                            <span>22 Carat gold necklace for wedding</span>
                            <p className="slider_price">
                                starting at <span>$75,999</span>
                            </p>
                            <a href="#" className="button nav-link ">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>),
        (<>
            <div className="single_slider" style={{ backgroundImage: `url(${CI2})` }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="slider_content">
                                <p>exclusive offer -40% off this week</p>
                                <h1>Earings and Pendant</h1>
                                <span>Complete bridal set with white pearls</span>
                                <p className="slider_price">
                                    starting at <span>$89,499</span>
                                </p>
                                <a href="#" className="button nav-link">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>),
        (<>
            <div className="single_slider" style={{ backgroundImage: `url(${CI3})` }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="slider_content">
                                <p>exclusive offer -10% off this week</p>
                                <h1>Wedding Rings</h1>
                                <span>Ashirwaad Special wedding rings for couples.</span>
                                <p className="slider_price">
                                    starting at <span>$14,999</span>
                                </p>
                                <a href="#" className="button nav-link">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            if (index >= 2) {
                setIndex(0)
            } else {
                setIndex((index) => index + 1)
            }
        }, 2000)
        return () => clearInterval(interval)
    })

    return (
        <>
            
                {slider[index]}
            
        </>
    )
}

export default Carousel
