import { Link, Switch, Route } from 'react-router-dom'
import { authApi } from '../utils/authApi'
import headerLogo from '../images/header/header__logo.svg'
import React from 'react'
export default function Header(props) {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Mesto logo' className='header__logo' />
      <div className='header__verification-container'>
        <Switch>
          <Route path='/signup'>
            <Link className='header__btn-signin' to='/signin'>
              Sign in
            </Link>
          </Route>
          <Route path='/signin'>
            <Link className='header__btn-signin' to='/signup'>
              Register
            </Link>
          </Route>
          <Route path='/'>
            <span className='header__user-email'>{props.userEmail.email}</span>
            <Link
              className='header__btn-signin'
              onClick={() => {
                authApi.signOutUser()
              }}
              to='/signin'>
              Sign out
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  )
}
