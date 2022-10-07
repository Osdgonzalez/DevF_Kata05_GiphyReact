import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {getGifs} from '../list/apimethods'

const Paginacion = (props) => {


    const [paginaActual , setPaginaActual] = useState(props.pagina);

    const siguiente = async() => {


        props.setPosicion(props.posicion + 10);
        props.setPagina(props.posicion + 1);

        await getGifs(props.setListGifs , props.setPaginacion , props.valor , props.posicion , props.setPosicion , props.pagina , props.setTotalPag);
    }

    return (
        <div className='paginacion'>

            <Button variant="info">Anterior</Button>
            <p>Pag {props.pagina} / {props.total}</p>
            <Button variant="info"                    
                    onClick={() => siguiente()}>Siguiente</Button>

        </div>
    )
}

export {Paginacion}