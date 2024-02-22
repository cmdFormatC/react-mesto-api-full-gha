import React from 'react'
import logo from '../images/logo.svg';
import closeImage from '../images/close.svg';
import navBarImage from '../images/sliderButton.svg';
import { Link } from "react-router-dom";
export default function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
      <header className="header">
        <div className='header__desktop-view'>
          <img className="header__logo" src={logo} alt="Логотип" />
          {props.userEmail
          ?  
          <>
            <div className='header__text-container'>
              <p className='header__email'>{props.userEmail}</p>
              <button onClick={props.onLogout} type='button' className='header__button'>{props.linkText}</button>
            </div>
            <button onClick={toggleSidebar} className='header__slider-button' type='button'></button>
          </>
          : 
          <Link className='header__link' to={props.link}>{props.linkText}</Link>}
        </div>
        <div className='header__mobile-view'>
          {isOpen ? 
            (props.userEmail
              ? 
              <>
                <div className={`header__text-container ${isOpen ? 'header__text-container_show' : ''}`}>
                  <p className='header__email'>{props.userEmail}</p>
                  <button onClick={props.onLogout} type='button' className='header__button'>{props.linkText}</button>
                </div>
              </>
              :
              ''
            )
          :
          ''
          }
          <div className='header__mobile-row'>
            <img className="header__logo" src={logo} alt="Логотип" />
            {props.userEmail ? 
              <button style={{backgroundImage: isOpen ? `url(${closeImage})` : `url(${navBarImage})`}} onClick={toggleSidebar} className='header__slider-button' type='button'></button>
              :
              <Link className='header__link' to={props.link}>{props.linkText}</Link>

            }
          </div>
        </div>
      </header>
  )
}
