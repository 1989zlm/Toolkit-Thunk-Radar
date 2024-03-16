import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";



export const getFlights = createAsyncThunk('flights/getFlights', async () => {
    //!1)api isteği at
    const res = await axios.request(options);
    // console.log(res.data.aircraft)
    //!2)gelen veriyi formatla
    //dizi içindeki dizileri nesnelere çavireceğiz
    const formatted = res.data.aircraft.map((item) => ({
        id: item[0],
        code: item[1],
        lat: item[2],
        lng: item[3],
    }))

    // console.log(formated)
    //!3)aksiyonun payloadı olarak formatlanan veriyi ekle
    // return 'payload';
    return formatted;
})