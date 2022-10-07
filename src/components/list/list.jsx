import {useState , useEffect} from 'react'
import {CardComponent} from '../card/card'
import {Paginacion} from '../pagination/pagination'
import {getGifs , getGifsTrending , getGifsTranslate , getGifsRandom} from './apimethods'
import './list.css'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



const ListComponent = () => {

    const [listGifs , setListGifs] = useState([]);
    const [listGifsTranslate , setListGifsTranslate] = useState(undefined);
    const [valorbusqueda , setValorBusqueda] = useState('');
    const [valorbusqueda2 , setValorBusqueda2] = useState('');
    const [paginacion , setPaginacion] = useState({});
    const [pagina , setPagina] = useState(0);
    const [posicion , setPosicion] = useState(0);
    const [totalPag , setTotalPag] = useState(0);

    console.log(listGifs);

    const cambioValor = (event) => {
      setValorBusqueda(event.target.value);
    }

    useEffect(() => {
        console.log(listGifs);
    } , [listGifs])

    useEffect(() => {
      console.log(paginacion);
    } , [paginacion])

    const ejecutar = async (id) => {

      switch (id) {
        case 1:
          setValorBusqueda2(valorbusqueda);
          await getGifs(setListGifs, setPaginacion , valorbusqueda , posicion , setPosicion , pagina , setTotalPag , totalPag);
          break;
        case 2:
          await getGifsTrending(setListGifs);
          break;
        case 3:
          await getGifsTranslate(setListGifsTranslate);
          break;
        case 4:
          await getGifsRandom(setListGifs);
          objetoResult();
          break;

        default:
          break;
      }
        
        setValorBusqueda('');
    }

    const home = () => {
      const contenedorCards = document.querySelector('.cards');
      console.log(contenedorCards);
      while(contenedorCards.firstChild){
        contenedorCards.removeChild(contenedorCards.firstChild);
      }
    }
    
    const objetoResult = () => {
      console.log(listGifsTranslate);
      if(listGifsTranslate !== undefined){
        return (
          <div>
            <CardComponent
              url={listGifsTranslate.images.downsized_medium.url}
              title={listGifsTranslate.title}
              type={listGifsTranslate.type}
              source={listGifsTranslate.source}
              user={listGifsTranslate.user.username}
              key={listGifsTranslate.id}
            ></CardComponent>
          </div>
        );
      }
    }

    const siguiente = async () => {

      if(!(posicion > paginacion)){
        console.log(posicion , 'antes pos');
        console.log(pagina , 'antes pag');
        let pos = posicion + 10;
        let pag = pagina + 1;
        setPosicion(pos);
        setPagina(pag);
  
        await getGifs(
          setListGifs,
          setPaginacion,
          valorbusqueda2,
          posicion,
          setPosicion,
          pagina,
          setTotalPag
        );
      }

    };

    const anterior = async () => {

      if(!(posicion < 0)){
        console.log(posicion , 'antes pos');
        console.log(pagina , 'antes pag');
        let pos = posicion - 10;
        let pag = pagina - 1;
        setPosicion(pos);
        setPagina(pag);
  
        await getGifs(
          setListGifs,
          setPaginacion,
          valorbusqueda2,
          posicion,
          setPosicion,
          pagina,
          setTotalPag
        );
      }

    };



    return (
      <div className="contenedor">
        <div>
          <Navbar bg="light" expand="xxl">
            <Container fluid>
              <Navbar.Brand href="#">GIF'S</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link onClick={() => home()}>Home</Nav.Link>
                  <Nav.Link onClick={() => ejecutar(2)}>Trending</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={cambioValor}
                    value={valorbusqueda}
                  />
                  <Button variant="outline-success" onClick={() => ejecutar(1)}>
                    Search
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="cards">
          {listGifs !== undefined && listGifs !== null ? (
            listGifs.map((element) => {
              return (
                <CardComponent
                  url={element.images.downsized_medium.url}
                  title={element.title}
                  type={element.type}
                  source={element.source}
                  user={element.username}
                  key={element.id}
                ></CardComponent>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="paginacion">
          {listGifs.length !== 0 ? (
            <div className="paginacion">
              <Button variant="info" onClick={() => anterior()}>
                Anterior
              </Button>
              <p>
                Pag {pagina} / {totalPag}
              </p>
              <Button variant="info" onClick={() => siguiente()}>
                Siguiente
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* <div>
          {
            paginacion !== undefined ? (
              <Paginacion
                setListGifs = {setListGifs}
                setPaginacion={setPaginacion}
                valor={valorbusqueda2}
                posicion={posicion}
                setPosicion={setPosicion}
                pagina={pagina}
                setPagina={setPagina}
                setTotalPag={setTotalPag}
                total={totalPag}
              ></Paginacion>
            ) : (
              <></>
            )
          }
        </div> */}
      </div>
    );
}

export {ListComponent}