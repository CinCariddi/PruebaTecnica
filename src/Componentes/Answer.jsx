import { useEffect, useState } from "react"
import {getFirestore, getDocs, collection } from 'firebase/firestore'
import dataValidation from '../Componentes/dataValidation.json'
import './Answer.css'

export default function Answer() {
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const app = getFirestore()
            try {
                const data = await getDocs(collection(app, 'items'))
                const docs = []
                data.forEach((doc) => {
                    docs.push(({...doc.data(), id:doc.id}))
                })
                setData(docs)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [data])

    return (
        <div className="Answer">
            <div>
                <button className="btn">
                    <a href="http://localhost:3000/" >Volver</a>
                </button>
                <div className="title">
                    Respuestas
                </div>
                {
                    data.map(e => (
                        <div key={e.id} className='card'>
                            <div className='info'>
                                {dataValidation.items[0].label}: {e.full_name}
                            </div>
                            <div className='info'>
                                {dataValidation.items[1].label}: {e.email}
                            </div>
                            <div className='info'>
                                {dataValidation.items[2].label}: {e.birth_date}
                            </div>
                            <div className='info'>
                                País de origen: {e.country_of_origin}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}