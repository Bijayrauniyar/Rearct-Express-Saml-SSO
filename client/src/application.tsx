import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logging from './config/logging';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        logging.info('Initiating SAML check.', 'SAML');

        // axios({
        //     method: 'GET',
        //     url: 'http://localhost:1337/whoami',
        //     withCredentials: true
        // })
        // .then(response => {
        //     logging.info(response.data.user, 'SAML');

        //     if (response.data.user.nameID)
        //     {
        //         setEmail(response.data.user.nameID);
        //         setLoading(false);
        //     }
        //     else
        //     {
        //         RedirectToLogin();    
        //     }
        // })
        // .catch(error => {
        //     logging.error(error, 'SAML');
        //     RedirectToLogin();
        // })
    }, []);

    const handleClick = ()=> {
        setLoading(true);
  axios({
            method: 'GET',
            url: 'http://localhost:1337/whoami',
            withCredentials: true
        })
        .then(response => {
            logging.info(response.data.user, 'SAML');

            if (response.data.user.nameID)
            {
                setEmail(response.data.user.nameID);
                setLoading(false);
            }
            else
            {
                RedirectToLogin();    
            }
        })
        .catch(error => {
            logging.error(error, 'SAML');
            RedirectToLogin();
        })
    }  

    const RedirectToLogin = () => {
        window.location.replace('http://localhost:1337/v1/ssoAuth/login');
    }

    if (loading)
        return <p>loading ...</p>

    return (
        <><p>Hello {email}!</p>
        <button onClick={handleClick}>getUser
        </button></>
    );
}

export default Application;