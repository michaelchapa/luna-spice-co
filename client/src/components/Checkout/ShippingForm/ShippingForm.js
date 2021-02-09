import React from 'react';
import { Formik, useField, Form} from 'formik';
import * as Yup from 'yup';
import { ShippingStyles } from './ShippingStyles';

const CustomTextInput = ({label, ...props}) => {
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(props);
    return (
        <>
        <label htmlFor = {props.id || props.name}>{label}</label>
            <input className = "shipping-text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className = "error">{meta.error}</div>
            ): null}
        </>
    )
}

const CustomCheckbox = ({children, ...props}) => {
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(props, 'checkbox');
    return (
        <>
        <label className = "checkbox">
            <input type = "checkbox" {...field} {...props} />
            {children}
        </label>
        {meta.touched && meta.error ? (
            <div className = "error">{meta.error}</div>
        ): null}
        </>
    )
}

// eslint-disable-next-line
const CustomSelect = ({label, ...props}) => {
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(props);
    return (
        <>
        <label htmlFor = {props.id || props.name}>{label}</label>
            <select className = "shipping-select-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className = "error">{meta.error}</div>
            ): null}
        </>
    )
}

function ShippingForm() {
    return (
        <ShippingStyles>
            <Formik
                initialValues = {{
                    name: '',
                    email: '',
                    address1: '', 
                    address2: '',
                    city: '',
                    state: '',
                    zipcode: '', 
                    acceptedTerms: '',
                }}

                validationSchema = {Yup.object({
                    name: Yup.string()
                        .min(2, 'Must be at least 2 characters')
                        .max(13, 'Must be less than 13 characters')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    address1: Yup.string()
                        .min(2, 'Must be at least 2 characters')
                        .max(35, 'Must be less than 35 characters')
                        .required('Required'),
                    address2: Yup.string()
                        .min(2, 'Must be at least 2 characters')
                        .max(35, 'Must be less than 35 characters'),
                    city: Yup.string()
                        .min(2, 'Must be at least 2 characters')
                        .max(35, 'Must be less than 35 characters')
                        .required('Required'),
                    state: Yup.string()
                        .min(2, 'Must be at least 2 characters')
                        .max(35, 'Must be less than 35 characters')
                        .required('Required'),
                    zipcode: Yup.number()
                        .min(5, 'Must be 5 digits')
                        .required('Required'),
                    acceptedTerms: Yup.boolean()
                        .oneOf([true], 'You must accept the Terms & Conditions')
                        .required('Required')
                })}

                onSubmit={(values, { setSubmitting, resetForm}) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        resetForm();
                        setSubmitting(false);
                    }, 3000)
                }}
            >
                {props => (
                    <Form>
                        <h1>Shipping</h1>
                        <CustomTextInput label = "Name" name = "name" type = "text" />
                        <CustomTextInput label = "Email" name = "email" type = "email" />
                        <CustomTextInput label = "Address 1" name = "address1" type = "text" />
                        <CustomTextInput label = "Adddress 2" name = "address2" type = "text" />
                        <CustomTextInput label = "City" name = "city" type = "text" />
                        <CustomTextInput label = "State" name = "state" type = "text" />
                        <CustomTextInput label = "Zipcode" name = "zipcode" type = "text" />
                        <CustomCheckbox name = "acceptedTerms">
                            I accept the Terms and Conditions
                        </CustomCheckbox>
                        <button type = "submit">{props.isSubmitting ? 'Calculating...' : 'Calculate Shipping'}</button>
                    </Form>
                )}

            </Formik>
        </ShippingStyles>
    )
}

export default ShippingForm
