import Router from 'next/router';
import NProgress from 'nprogress';

import Page from '../components/Page';
import { LoginStateProvider } from '../lib/loginState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <LoginStateProvider>
            <Page>
                <Component {...pageProps} />
            </Page>
        </LoginStateProvider>
    );
}

export default MyApp;
