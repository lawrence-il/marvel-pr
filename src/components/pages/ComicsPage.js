import { Helmet, HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const ComicsPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                    />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </HelmetProvider>
    )
}
export default ComicsPage;