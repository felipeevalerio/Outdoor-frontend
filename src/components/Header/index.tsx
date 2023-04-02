import { useNavigate } from "react-router-dom";
import { HeaderContainer, LinkButton, LinksContainer, MainLinks, SignInSignUpButton } from "./styles";
import signInSignUpImg from '../../assets/SignInSignUp.png'
import { Logo } from "../Logo";
import * as Dialog from '@radix-ui/react-dialog';
import { LoginModal } from "../../pages/LoginModal";
import { UserContext } from "../../contexts/UserContext";
import { MouseEvent, useContext } from "react";

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

export function Header() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const userFirstName = user?.name?.split(' ')[0] ?? 'Entre ou cadastre';

    function redirectUserToPage(href: string) {
        navigate(href);
    }

    function renderSignInButtonOrProfileInfo() {
        return (
            <SignInSignUpButton userHaveAvatar={!!user?.avatar}>
                <img src={user?.avatar || signInSignUpImg} alt="" />
                <span>{userFirstName}</span>
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

                        <LoginModal />
                    </Dialog.Root>
                )}
            </LinksContainer>
        </HeaderContainer>
    )
}