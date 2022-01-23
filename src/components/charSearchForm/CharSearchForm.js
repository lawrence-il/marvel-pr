import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage as FormikErMessage} from "formik";
import ErrorMessage from "../errorMessage/ErrorMessage";
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import './charSearchForm.scss';

const setContent = (process, Component) => {
    switch (process) {
        case 'waiting':
            return null;
        case 'loading':
            return null;
        case 'confirmed':
            return <Component />;
        case 'not found':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharSearchForm = () => {

    const {getCharByName, process, setProcess} = useMarvelService();
    const [charName, setCharName] = useState(false);


    useEffect(() => {
        if (charName) onRequest(charName);
    }, [charName]);

    const onRequest = (value) => {
        getCharByName(value)
                .then(() => setProcess('confirmed'))
                .catch(() => setProcess('not found'))
    };

    const foundChar = process === 'confirmed' ? 
                            <div className="char__wrapper-success">
                                <div className="char__success">There is! Visit {charName} page?</div>
                                <Link className="button button__secondary" to={`/character/${charName}`}><div className="inner">Go page</div></Link>
                            </div> 
                            : null;
                                
    const notFoundChar =  process === 'not found' ? 
                            <div className="char__error">
                                The character was not found. Check the name and try again
                            </div>  
                            : null;
                            
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
                    disabled={process === 'loading'}>
                    <div className="inner">Find</div>
                </button>
                <FormikErMessage className="char__error" name='character' component='div'/>
                {setContent(process, () => foundChar || notFoundChar)}
            </Form>
        </Formik>
    )
}

export default CharSearchForm;