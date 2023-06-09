import { useNavigate } from "react-router-dom";
import { HeaderContainer, LinkButton, LinksContainer, MainLinks, SignInSignUpButton } from "./styles";
import { Logo } from "../Logo";
import * as Dialog from '@radix-ui/react-dialog';
import { LoginModal } from "../../pages/LoginModal";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";
import { RegisterModal } from "../../pages/RegisterModal";
import { useUser } from "../../hooks/useUser";
import { Avatar } from "../Avatar";
import { Routes } from "../../routes";

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

    function redirectUserToMyServices(event: any) {
        event?.stopPropagation();
        redirectUserToPage('/meus-servicos');
    }

    function redirectToProfilePage() {
        if (user) navigate(Routes.Profile);
    }

    function renderSignInButtonOrProfileInfo() {
        return (
            <SignInSignUpButton onClick={redirectToProfilePage} userHaveAvatar={!!user?.avatar}>
                <Avatar/>
                <span>{userFirstName}</span>
                {user && <ul className="userMenu">
                    {user.userType === 'provider' && <li onClick={(e) => redirectUserToMyServices(e)}>Meus serviços</li>}
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