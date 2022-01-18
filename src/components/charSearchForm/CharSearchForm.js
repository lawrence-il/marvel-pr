import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import './charSearchForm.scss';


const CharSearchForm = () => {

    const {loading, error, getCharByName, clearError} = useMarvelService();
    const [charStatus, setCharStatus] = useState(false);
    const [charName, setCharName] = useState(false);


    useEffect(() => {
        if (charName) onRequest(charName);
        if (error) clearError();
    }, [charName]);

    const onRequest = (value) => {
        getCharByName(value)
                .then(() => setCharStatus(true))
                .catch(() => setCharStatus(false))
    };

    const foundChar = charStatus && !error && !loading ? <div className="char__wrapper-success">
                                    <div className="char__success">There is! Visit {charName} page?</div>
                                    <Link className="button button__secondary" to={`/character/${charName}`}><div className="inner">Go page</div></Link>
                                </div> 
                                : null;
                                
    const notFoundChar = !charStatus && !error && charName && !loading ? (
            <div className="char__error">
                The character was not found. Check the name and try again
            </div>)  : null;
    
    return (
        <Formik
            initialValues={
                {
                    character: '',
                }
            }
            validationSchema={
                Yup.object({
                    character: Yup.string()
                                .required('This field is required')
                })
            }
            onSubmit={value => setCharName(value.character)}>
            <Form className="char__form">
                <label className="char__title" htmlFor="character">Or find a character by name:</label>
                <Field name='character' className='char__input' placeholder='Enter name'/>
                <button 
                    type='submit' 
                    className="button button__main"
                    disabled={loading}>
                    <div className="inner">Find</div>
                </button>
                <ErrorMessage className="char__error" name='character' component='div'/>
                {foundChar}
                {notFoundChar}
            </Form>
        </Formik>
    )
}

export default CharSearchForm;