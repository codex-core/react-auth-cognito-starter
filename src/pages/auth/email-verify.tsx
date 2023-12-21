import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap'
// import { UserContext } from '../../providers/UserContextProvider';
// import { verifyStoreEmail, verifyUserEmail } from '../../services/api/accounts';
// import { setUser } from '../../services/store';
// import { useQuery } from '../common/helpers/hooks/useQuery';

function VerifyUserEmail() {
    // const query = useQuery();
    // const {updateUserInfo} = useContext(UserContext)
    // const navigate = useNavigate()
    // const [digest, setDigest] = useState('Verifying your email..')
    // useEffect(()=> {
    //     let userId =query.get('user_id');
    //     let token = query.get('token')
    //     //check the token

    //     verifyUserEmail(userId).then(res=> {
    //         toast.success('Email verification successful!')
    //         setDigest('We are good to go!')
    //         updateUserInfo(res.data.user)
    //         navigate(`/`)

    //     }).catch(err=> {
    //         setDigest('Something went wrong when verifying')
    //         toast.error('We were unable to verify your email')
    //         navigate('/')
    //     })
    // },[])
    return (
        <div className='flx-sol-table vh-fill'>
            <div className='flx-sol-table-cell' style={{width: '100vw', textAlign:'center'}}>
                {/* <p>{digest}</p> */}
                <Spinner animation="border" variant="light"/>
            </div>
        </div>
      )
}

export default VerifyUserEmail