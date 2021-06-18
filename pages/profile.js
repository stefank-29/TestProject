import { useUser } from '../lib/loginState';

export default function Profile() {
    const { loggedIn, setLoggedIn } = useUser();
    console.log(loggedIn);
    return <div>Profile</div>;
}
