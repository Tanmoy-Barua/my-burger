import React, {useState} from 'react'
import { Formik } from 'formik'
import {auth} from '../../redux/AuthActionCreators'
import {connect} from 'react-redux'
import Spinner from '../Spinner/Spinner'

const mapDispatchtoProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode)),
    }
}
const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMessage: state.authFailedMessage,
    }
}

const Auth = (props) => {
    document.title = "BURGER BUILDER || SIGN UP OR SIGN IN";
    const [mode, setMode] = useState('Sign Up')
    const switchMode = () => {
        setMode(mode === 'Sign Up'? 'Sign In' : "Sign Up")
    }
    
    let form = null;
    let error = null;
    const weakPassword = 'WEAK_PASSWORD : Password should be at least 6 characters';

    if(props.authFailedMessage !== null){
        if(props.authFailedMessage === 'EMAIL_EXISTS'){
            error = (
                <>
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Your Email is Exists, Please try another email.</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            ) 
        }

        if(props.authFailedMessage === weakPassword){
            error = (
                <>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Your Password is Weak, Please use atleast 6 character password</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            ) 
        }

        if(props.authFailedMessage === 'EMAIL_NOT_FOUND' || props.authFailedMessage === 'INVALID_PASSWORD'){
            error = (
                <>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Your Email Address or Password Not Matched</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            ) 
        }
    }else{
        error = null;
    }


    if(props.authLoading === true){
        form = <Spinner />
    }else{
        form = (
            <Formik
            initialValues = {
                {
                    email: "",
                    password: "",
                    cPassword: "",
                }
            }
            onSubmit = {
                (values) => {
                    props.auth(values.email, values.password, mode)
                }
            }

            validate ={ (values) => {
                const errors = {};
                if(values.email==='') {
                    errors.email = 'Required'
                }
                else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid Email Address'
                }

                if(values.password===''){
                    errors.password = 'Required'
                }
                else if(values.password.length < 4){
                    errors.password = 'Must be atleast 4 character'
                }
                if(mode === 'Sign Up'){
                    if(values.cPassword===''){
                        errors.cPassword = 'Required'
                    }
                    else if(values.cPassword !== values.password){
                        errors.cPassword = 'Password and Confirmation Password not matched'
                    }
                }
                // console.log(errors);
                return errors;
            }}
        >
            
            {
            ({values, handleChange, handleSubmit, errors})=>(
            <>
            <div className="col-6 text-center my-2 mx-auto">
            <button className="btn btn-secondary my-2" onClick={switchMode}>Switch to {mode==='Sign Up' ? 'Sign In' : "Sign Up"}</button>
            {error}
            </div>
            <div className="d-flex justify-content-center my-4">
                <form className="col-6" onSubmit={handleSubmit}>
                    <div className="my-2">
                    <input type="text" className="form-control" name="email" placeholder="Enter Your Email" value={values.email} onChange={handleChange} />
                    <span className="text-danger">{errors.email}</span>
                    </div>
                    <div className="my-2">
                    <input type="text" className="form-control my-2" name="password" placeholder="Enter Your Password" value={values.password} onChange={handleChange} />
                    <span className="text-danger">{errors.password}</span>
                    </div>
                    {mode === 'Sign Up' ? (<div className="my-2">
                    <input type="text" className="form-control my-2" name="cPassword" placeholder="Enter Your Confirm Password" value={values.cPassword} onChange={handleChange} />
                    <span className="text-danger">{errors.cPassword}</span>
                    </div>) : null}
                    
                    <button type="submit" className="btn navbar-bg-color text-uppercase">{mode === 'Sign Up'? 'Sign Up' : "Sign In"}</button>
                </form>

            </div>
            </>
            )}

        </Formik>
        )
    }
  return (
    <div className="conatiner">
        {form}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchtoProps) (Auth)