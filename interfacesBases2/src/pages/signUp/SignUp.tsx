
import SignUpForm from '../../components/signUp/SignUpForm'
import './signUp.css'



export default function SignUp() {


  return (
    <div className="mainSignUpContainer">
      <div className="mainSignUpFormContainer">

        <div className="signUpTitleContainer">
          <h2 className="signUpTitle">Regístrate</h2>
        </div>

        <div className="signUpFormContainer">
          <SignUpForm/>
                    
        </div>
      </div>
    </div>
  )
}