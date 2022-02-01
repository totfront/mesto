import React, { useState, useEffect } from 'react'
import '../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { api } from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import { authApi } from '../utils/authApi'
import successImage from '../images/popup/success.svg'
import failureImage from '../images/popup/failure.svg'

const initialPopupState = { isEditAvatarPopupOpen: false, isEditProfilePopupOpen: false, isAddPlacePopupOpen: false, isOverviewPopupOpen: false, isInfoTooltipPopupOpen: false }

function App(props) {
  const [popupState, setPopupState] = useState(initialPopupState)
  const [infoTooltipData, setInfoTooltipData] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [userData, setUserData] = useState(null)
  const [cardsData, setCardsData] = useState([])
  const [userEmail, setUserEmail] = useState(null)
  const [headerBtnData, setHeaderBtnData] = useState(null)

  const history = useHistory()

  useEffect(() => {
    authApi
      .checkToken()
      .then(res => {
        if (res !== 'Error 401' && res) {
          getCardsAndUserdata()
        } else {
          history.push('signin')
        }
      })
      .catch(err => {
        console.warn(err + ' && User`s token ckecking error')
      })
  }, [])

  function getCardsAndUserdata() {
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserData(userData)
        if (Array.isArray(cardsData)) setCardsData(cardsData)
      })
      .then(() => {
        history.push('/')
      })
      .catch(err => {
        console.log(err + ' && Error during getting user data / Error duting getting cards data')
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === userData._id)
    api
      .switchLike(isLiked, card._id)
      .then(newCard => {
        const newCards = cardsData.map(c => (c._id === card._id ? newCard : c))
        setCardsData(newCards)
      })
      .catch(err => {
        console.log(err + ' && Error during liking the card')
      })
  }
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const getDeletedCard = item => {
          return item._id !== card._id
        }
        setCardsData(cardsData.filter(getDeletedCard))
      })
      .catch(err => {
        console.log(err + ' && Error during deleting card')
      })
  }
  const handleCardClick = cardData => {
    setSelectedCard(cardData)
  }
  const closeAllPopups = () => {
    setPopupState(initialPopupState)
    setSelectedCard(null)
  }
  const handleUpdateUser = newUserData => {
    api
      .updUserData({ name: newUserData.userName, about: newUserData.userDescription })
      .then(newUserData => {
        setUserData(newUserData)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err + ' && Error during changing user data')
      })
  }
  const handleUpdateAvatar = avatarUrl => {
    api
      .updAvatar(avatarUrl)
      .then(newUserData => {
        setUserData(newUserData)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err + ' && Error during avatar changing')
      })
  }
  const handleAddPlaceSubmit = newPlace => {
    api
      .addCard(newPlace)
      .then(newCardData => {
        setCardsData([newCardData.data, ...cardsData])
        closeAllPopups()
      })
      .catch(err => {
        console.log(err + ' && Error during addding new card')
      })
  }
  // SignIn btn handler
  const handleSignInSubmit = (popupData, userSignInData) => {
    authApi
      .signInUser(userSignInData)
      .then(res => {
        if (res.verifiedToken) {
          getCardsAndUserdata()
          setUserEmail(userSignInData.email)
          setUserData(userSignInData)
        } else {
          setPopupState({ ...popupState, isInfoTooltipPopupOpen: true })
          setInfoTooltipData(popupData)
        }
      })
      .catch(err => {
        console.log(err + ' && Authorisation error')
      })
  }
  // SignUp btn handler
  const handleSignUpSubmit = userSignUpData => {
    const setSignUpPopupData = popupData => {
      setPopupState({ ...popupState, isInfoTooltipPopupOpen: true })
      setInfoTooltipData(popupData)
    }
    authApi
      .registerNewUser(userSignUpData)
      .then(res => {
        if (res.data) {
          props.history.push('/signin')
          setSignUpPopupData({ imgPath: successImage, text: 'Success!' })
        } else {
          setSignUpPopupData({ imgPath: failureImage, text: 'Something went wrong. Try again!' })
        }
      })
      .catch(err => {
        console.log(err + ' && Registration error')
      })
  }
  return (
    <CurrentUserContext.Provider value={userData}>
      <div>
        <Header
          setHeaderBtnData={newHeaderBtnData => {
            setHeaderBtnData(newHeaderBtnData)
          }}
          headerBtnData={headerBtnData}
          history={history}
          userEmail={{ email: userEmail, setUserEmail: setUserEmail }}
        />
        <Switch>
          <Route path='/signin'>
            <Login
              onSubmit={(popupData, userData) => {
                handleSignInSubmit(popupData, userData)
              }}
            />
          </Route>
          <Route path='/signup'>
            <Register
              onSubmit={userSignUpData => {
                handleSignUpSubmit(userSignUpData)
              }}
            />
          </Route>
          <Route path='*'>
            {userData ? (
              <Main
                updCardsData={newCardsData => {
                  setCardsData(newCardsData)
                }}
                handleCardLike={card => handleCardLike(card)}
                handleCardDelete={card => handleCardDelete(card)}
                cardsData={cardsData}
                onEditAvatar={() => {
                  setPopupState({ ...popupState, isEditAvatarPopupOpen: true })
                }}
                onEditProfile={() => {
                  setPopupState({ ...popupState, isEditProfilePopupOpen: true })
                }}
                onAddPlace={() => {
                  setPopupState({ ...popupState, isAddPlacePopupOpen: true })
                }}
                onOverviewPopup={() => {
                  setPopupState({ ...popupState, isOverviewPopupOpen: true })
                }}
                onCardClick={handleCardClick}
              />
            ) : (
              <p style={{ color: 'white' }}>Loading...</p>
            )}
          </Route>
        </Switch>
        {history.location.pathname == '/' && <Footer />}
        <InfoTooltip popupData={infoTooltipData} isOpen={popupState.isInfoTooltipPopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={avatarUrl => handleUpdateAvatar(avatarUrl)} isOpen={popupState.isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup
          onUpdateUser={newUserData => {
            handleUpdateUser(newUserData)
          }}
          isOpen={popupState.isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup isOpen={popupState.isAddPlacePopupOpen} onClose={closeAllPopups} handleAddPlaceSubmit={newPlace => handleAddPlaceSubmit(newPlace)} />
        <ImagePopup card={selectedCard} isOpen={popupState.isOverviewPopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default withRouter(App)
