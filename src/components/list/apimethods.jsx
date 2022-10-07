import axios from "axios"

const URL = "https://api.giphy.com/v1/gifs/";
const API_URL = "cScdBpngJp7REI49niSfv3yrpL3lg6xq";

const getGifs = async (setListGifs , setPaginacion , valor , posicion , setPosicion , pagina , setTotalPag , total) => {

    const URL = "https://api.giphy.com/v1/gifs/";
    const API_URL = "cScdBpngJp7REI49niSfv3yrpL3lg6xq";
    let data = {};

    // console.log(pagina);
    // if(pagina !== 1){
    //     posicion = posicion + 10;
    //     setPosicion(posicion);
    //     pagina = pagina + 1;
    // }

    console.log(pagina , 'Pagina');
    console.log(posicion , 'Posicion');

    await axios.get(`${URL}search?api_key=${API_URL}&q=${valor}&limit=10&offset=${posicion}`)
    .then(res => {
        data = res;
        return data;
    })
    .catch(error => {
        console.log(error);
    })
    .then(response => {
        setListGifs(response.data.data);
        setPaginacion(data.data.pagination);
        let paginas = Math.ceil(data.data.pagination.total_count / 10)
        setTotalPag(paginas);
        console.log(paginas , 'total paginas');
    });
}


const getGifsTrending = async (setListGifs) => {
    await axios.get(`${URL}trending?api_key=${API_URL}&limit=10`)
    .then(res => res.data.data)
    .catch(error => console.log(error))
    .then(response => {
        setListGifs(response);
    });
}

const getGifsTranslate = async(setListGifs) => {
    await axios.get(`${URL}translate?api_key=${API_URL}&s=car`)
    .then(res => res.data)
    .catch(error => console.log(error))
    .then(response => {
        setListGifs(response);
    })
}

const getGifsRandom = async(setListGifs) => {
    await axios.get(`${URL}random?api_key=${API_URL}&limit=9`)
    .then(res => res.data)
    .catch(error => console.log(error))
    .then(response => {
        setListGifs(response);
    })
}


export {getGifs , getGifsTrending , getGifsTranslate , getGifsRandom}