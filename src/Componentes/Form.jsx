import { useState } from "react";
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import Swal from 'sweetalert2'
import './Form.css'
import dataValidation from '../Componentes/dataValidation.json'

const countries = dataValidation.items[3].options.map((val) => val.label)
// function validate (item, oldErrors){
    //     let errors = oldErrors;
    //     if(item.full_name === ''){
        //         errors.full_name = 'Escribir un nombre'
        //     }
        //     return errors
        // }
        
export default function Form() {
    const app = getFirestore()
    // const [errors, setErrors] = useState({full_name: ''})
    const [item, setItem] = useState({ 
        full_name: "",
        email: "",
        birth_date: "",
        country_of_origin: "",
        terms_and_conditions: true
    });

    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name] : e.target.value
        })
        // setErrors(validate({
        //     ...item,
        //     [e.target.name]: e.target.value
        // }, errors)
        // )
    }

    const handleSelect = (e) => {
        setItem({
            ...item,
            country_of_origin: [...item.country_of_origin, e.target.value]
        })
    }

    const guardarDatos = async(e) => {
        e.preventDefault()
        try{
            await addDoc(collection(app, 'items'), {
                ...item
            })
        } catch(err) {
            console.log(err)
        }
        Swal.fire({
            title: '<strong>Formulario completado</strong>',
            icon: 'info',
            html:
                '<a href="http://localhost:3000/answer">Consulta las respuestas del formulario</a> ',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Aceptar',
            confirmButtonAriaLabel: 'Thumbs up, great'
        })
        setItem({
            full_name: "",
            email: "",
            birth_date: "",
            country_of_origin: "",
            terms_and_conditions: true
        })
    }

    return (
        <div>
            <form onSubmit={e => guardarDatos(e)}>
                <div className="form">
                    <div className='titulo'>Formulario</div>
                    <div className='item'>
                        <label className='label'>
                            {dataValidation.items[0].label}
                        </label>
                        <input 
                        type='text'
                        name='full_name'
                        value={item.full_name}
                        onChange={ e => handleChange(e) } 
                        className='input'
                        required
                        title="Ingresar caracteres alfabeticos"
                        placeholder="Cintia Cariddi"
                        />
                    </div>
                    <div className='item'>
                        <label className='label' htmlFor="email">
                        {dataValidation.items[1].label}
                        </label>
                        <input 
                        type='email'
                        name='email' 
                        value={item.email}
                        onChange={ e => handleChange(e) }
                        className='input'
                        required
                        placeholder="cintiacariddi@gmail.com"
                        />
                    </div>
                    <div className='item'>
                        <label className='label'>
                        {dataValidation.items[2].label}
                        </label>
                        <input 
                        type='date'
                        name='birth_date' 
                        value={item.birth_date}
                        onChange={ e => handleChange(e) }
                        className='input'
                        required
                        title="Coloca tu fecha de nacimiento"
                        />
                    </div>
                    <div className='item'>
                        <label className='label'>
                        {dataValidation.items[3].label}
                        </label>
                        <select name='country_of_origin' onChange={ e => handleSelect(e) } className='input'> 
                            <option>Elige una opción</option>
                            {countries?.map(e => 
                                <option key={e} value={e} required>{e}</option>
                            )}
                        </select>
                    </div>
                    <div className='item'>
                        <label className='label'>
                            {dataValidation.items[4].label}
                        </label>
                        <input 
                        type='checkbox'
                        name='terms_and_conditions' 
                        value={item.terms_and_conditions}
                        onChange={ e => handleChange(e) }
                        className='input'
                        required
                        title="Acepta términos y condiciones"
                        />
                    </div>  
                    <button type='submit' className="btn">
                        {dataValidation.items[5].label}
                    </button>
                </div>
            </form>
        </div>
    )
}