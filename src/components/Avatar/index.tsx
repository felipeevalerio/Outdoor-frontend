import { useContext } from 'react';
import signInSignUpImg from '../../assets/SignInSignUp.png'
import { UserContext } from '../../contexts/UserContext'
import { AvatarImg } from './styles'

export function Avatar() {
    const {user} = useContext(UserContext);

    return <AvatarImg src={user?.avatar ?? signInSignUpImg} alt="" />
}