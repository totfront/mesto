import { useState } from 'react'

export default function Authentication(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  return (
    <div className='authentication appearance'>
      <div className='authentication__container'>
        <h2 className='authentication__title'>{props.title}</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            props.onSubmit({ email, password })
          }}
          className='authentication__form'
          id={props.name}
          name={props.name}
          action='#'
          method='post'>
          <div className='authentication__input-wrapper'>
            <input onChange={handleEmailChange} value={email} placeholder='Email' className='authentication__input' type='text' name='emal' required />
            <input onChange={handlePasswordChange} value={password} placeholder='Password' className='authentication__input' type='text' name='password' required />
          </div>
          <button name='submitBtn' className='authentication__submit-btn' type='submit'>
            {props.submitBtnText}
          </button>
        </form>
      </div>
    </div>
  )
}
