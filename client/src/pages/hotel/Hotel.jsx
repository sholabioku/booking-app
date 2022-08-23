import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import useFetch from '../../hooks/useFetch';
import './hotel.css';

const Hotel = () => {
  const location = useLocation();
  const hotelId = location.pathname.split('/')[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/${hotelId}`);

  console.log(data);

  const handleOpen = (index) => {
    setSlideNumber(index);
    setIsOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? (
        'loading'
      ) : (
        <div className='hotelContainer'>
          {isOpen && (
            <div className='slider'>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className='close'
                onClick={() => setIsOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className='arrow'
                onClick={() => handleMove('l')}
              />
              <div className='sliderWrapper'>
                <img
                  src={data.photos[slideNumber]}
                  alt=''
                  className='sliderImg'
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className='arrow'
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className='hotelWrapper'>
            <button className='bookNow'>Reserve or Book Now!</button>
            <h1 className='hotelTitle'>{data.name}</h1>
            <div className='hotelAddress'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className='hotelDistance'>
              Excellent location – {data.distance}m from center
            </span>
            <span className='hotelPriceHighlight'>
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className='hotelImages'>
              {data.photos?.map((photo, index) => (
                <div className='hotelImgWrapper'>
                  <img
                    onClick={() => handleOpen(index)}
                    src={photo}
                    alt=''
                    className='hotelImg'
                  />
                </div>
              ))}
            </div>
            <div className='hotelDetails'>
              <div className='hotelDetailsText'>
                <h1 className='hotelTitle'>{data.title}</h1>
                <p className='hotelDesc'>{data.desc}</p>
              </div>
              <div className='hotelDetailsPrice'>
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>$945</b> (9 nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Hotel;
