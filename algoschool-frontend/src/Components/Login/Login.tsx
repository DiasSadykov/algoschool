import React, { Dispatch, SetStateAction } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../firebase';
import { firebaseUiConfig } from '../../firebase';

interface Props {
    visible: boolean
    setLoginVisible: Dispatch<SetStateAction<boolean>>
}

function Login(props: Props) {

    return (
        <>
            <div className="absolute w-96 top-14 right-7 flex flex-col bg-white border border-gray-100 p-8 shadow-xl rounded-lg" style={props.visible ? {} : { visibility: 'hidden', opacity: 0 }}>
                <div className="inline-block text-lg text-gray-700 font-semibold ml-6">Log in</div>
                <div className="inline-block text-sm text-gray-400 font-light ml-6">Use an account to save your progress </div>
                <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
            </div>

        </>
    );
}

export default Login