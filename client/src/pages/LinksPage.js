import {useState} from 'react'

import { Loader } from '../components/Loader'
export const LinksPage = () => {
    const [links, setLinks] = useState([])
    return (
        <div>
            <Loader />
        </div>
    )
}