import { useUser } from '../lib/loginState';
import { useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import { ButtonStyles } from '../components/Navigation';
import { useState } from 'react/cjs/react.development';

const ProfileStyles = styled.div`
    width: 100%;
    min-height: 65rem;
    background-color: whitesmoke;
    border-radius: 15px;
    padding: 1.5rem 3.5rem;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
    .details {
        display: flex;
        align-items: center;
        .image {
            position: relative;
            margin: 3rem 0 2rem;
            width: 23rem;
            height: 23rem;
            box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.05);
        }
        .info {
            display: flex;
            flex-direction: column;
            margin-left: 5rem;
            font-size: 1.8rem;
            > * {
                margin-bottom: 2rem;
            }
            .name {
                font-weight: bold;
                font-size: 2rem;
            }
        }
    }
    .toggleBtn {
        margin-left: 4rem;
    }
`;

// const ButtonStyles = styled.button``;

export default function Profile() {
    const { loggedIn, setLoggedIn } = useUser();
    const [user, setUser] = useState({
        name: 'Stefan Karaferovic',
        email: 'stefankaraferovic@gmail.com',
        github: 'https://github.com/stefank-29',
        image: '/profileimage.jpg',
    });

    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        if (!loggedIn) {
            Router.replace('/');
        }
    }, []);
    if (!loggedIn) return null;
    return (
        <ProfileStyles>
            <h1>Profile info</h1>
            <div className="details">
                {!isToggled ? (
                    <div className="image">
                        <Image
                            src="/profileImage.jpg"
                            layout="fill"
                            alt="profile image"
                        />
                    </div>
                ) : (
                    <img
                        className="image"
                        src={`https://api.hello-avatar.com/adorables/285/${user.email}`}
                    />
                )}
                <div className="info">
                    <div className="name">{user.name}</div>
                    <div className="email">
                        <span>Email: </span>
                        {user.email}
                    </div>
                    <div className="github">
                        {' '}
                        <span>GitHub: </span>
                        {user.github}
                    </div>
                </div>
            </div>
            <ButtonStyles
                className="toggleBtn"
                onClick={() => setIsToggled(!isToggled)}
            >
                Toggle Avatar
            </ButtonStyles>
        </ProfileStyles>
    );
}
