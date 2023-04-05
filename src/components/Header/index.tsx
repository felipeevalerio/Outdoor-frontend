import { useNavigate } from "react-router-dom";
import { HeaderContainer, LinkButton, LinksContainer, MainLinks, SignInSignUpButton } from "./styles";
import signInSignUpImg from '../../assets/SignInSignUp.png'
import { Logo } from "../Logo";
import * as Dialog from '@radix-ui/react-dialog';
import { LoginModal } from "../../pages/LoginModal";
import { UserContext } from "../../contexts/UserContext";
import { MouseEvent, useContext, useState } from "react";
import { RegisterModal } from "../../pages/RegisterModal";
import { useUser } from "../../hooks/useUser";

interface INavLink {
    title: string;
    href: string;
}

const navLinks: INavLink[] = [
    {
        title: 'Início',
        href: '/'
    },
    {
        title: 'Serviços',
        href: '/servicos'
    },
    {
        title: 'Contatos',
        href: '/contatos'
    },
]

export enum ModalCategory {
    Register = "register",
    Login = "login"
}

export function Header() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useUser();

    const navigate = useNavigate();
    const [currentModal, setCurrentModal] = useState<ModalCategory>(ModalCategory.Login);
    
    const userFirstName = user?.name?.split(' ')[0] ?? 'Entre ou cadastre';

    function redirectUserToPage(href: string) {
        navigate(href);
    }

    function handleLogoutUser() {
        logoutUser()
    }

    function renderSignInButtonOrProfileInfo() {
        return (
            <SignInSignUpButton userHaveAvatar={!!user?.avatar}>
                <img src={user?.avatar || signInSignUpImg} alt="" />
                <span>{userFirstName}</span>
                {user && <ul className="userMenu">
                    <li onClick={handleLogoutUser}>Encerrar sessão</li>
                </ul>
                }
            </SignInSignUpButton>   
        )
    }


    return (
        <HeaderContainer>
            <Logo />
            <LinksContainer>    
                <MainLinks>
                    {navLinks.map(link => {
                        return (
                            <LinkButton 
                                key={link.href} 
                                onClick={() => redirectUserToPage(link.href)}
                            >
                                {link.title}
                            </LinkButton>
                        )
                    })}
                </MainLinks>

                {user ? renderSignInButtonOrProfileInfo() : (
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            {renderSignInButtonOrProfileInfo()}
                        </Dialog.Trigger>
                        
                        {currentModal === ModalCategory.Login ? (
                            <LoginModal  setCurrentModal={setCurrentModal} />
                        ) : (
                            <RegisterModal setCurrentModal={setCurrentModal} />
                        )}
                    </Dialog.Root>
                )}
            </LinksContainer>
        </HeaderContainer>
    )
}