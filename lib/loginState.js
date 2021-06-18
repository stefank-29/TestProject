import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function LoginStateProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <LocalStateProvider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LocalStateProvider>
    );
}

function useUser() {
    const all = useContext(LocalStateContext);
    return all;
}

export { LoginStateProvider, useUser };
