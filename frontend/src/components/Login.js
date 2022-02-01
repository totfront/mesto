import Authentication from './Authentication'
import failureImage from '../images/popup/failure.svg'

export default function Login(props) {
  return (
    <Authentication
      onSubmit={userSignInData => {
        props.onSubmit({ imgPath: failureImage, text: 'Something goes wrong. Try again!' }, userSignInData)
      }}
      title='Sign in'
      name='Login'
      submitBtnText='Sign in'></Authentication>
  )
}
