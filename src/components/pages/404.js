import ErrorMessage from "../errorMessage/ErrorMessage";
import { useHistory } from "react-router-dom";

const Page404 = () => {
    const back = useHistory();
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <a style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 
                        'fontSize': '24px', 'marginTop': '30px', 'cursor': 'pointer'}} 
                        onClick={() => back.goBack()}
                        >Back to main page</a>
        </div>
    )
}

export default Page404;