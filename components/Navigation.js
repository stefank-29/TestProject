import styled from 'styled-components';
import Link from 'next/link';

const NavigationStyles = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    background-color: var(--darkblue);
    .section {
        display: flex;
    }
    .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .link {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        position: relative;
        height: 8rem;
        padding: 2rem;
        font-family: 'Avenir', sans-serif;
        font-size: 1.5rem;
        background-color: var(--darkblue);
        color: white;
        transition: all 0.3s;
        &.active,
        :hover {
            border-bottom-color: rgba(0, 0, 0, 0.2);
            border-right-color: rgba(0, 0, 0, 0.05);
            background: dodgerblue fixed;
            text-decoration: underline;
        }
    }
`;

export default function Navigation() {
    return (
        <NavigationStyles>
            <div className="section pages">
                <div className="item">
                    <Link href="/">
                        <a className="link logo">Navbar</a>
                    </Link>
                </div>
                <div className="item">
                    <Link href="/">
                        <a className="link">Home</a>
                    </Link>
                </div>
                <div className="item">
                    <Link href="/profile">
                        <a className="link">Profile</a>
                    </Link>
                </div>
            </div>
            <div className="section login"></div>
        </NavigationStyles>
    );
}
