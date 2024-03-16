import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from '../actions/flightActions';



const initialState = {
    isLoading: false,
    isError: false,
    flights: [],// bütün uçuşlar
    path: [], //1 uçuşun izlediği yol 
};
const flightSlice = createSlice({
    name: 'flight',
    initialState,
    //normal bi senkron actionu yazdıımız için extra reducer demedik uuçağın iziçin yapılan reducers
    reducers: {
        //map bileşeninde kullanılacak rotayı belirle
        setPath: (state, action) => {
            state.path = action.payload;
        },
        //mevcut rotayı temizler
        clearPath: (state, action) => {
            state.path = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFlights.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFlights.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;

        });
        builder.addCase(getFlights.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.flights = action.payload;
        });


    },


});

export const { setPath, clearPath } = flightSlice.actions;
export default flightSlice.reducer;


//1)bu sayfada slıce tanımını yaptık buradan stora tanımı yapmaya geçiyoruz.
//2)storda tanım yapıldıktan sonra main.js de provider tanımlayıp storu prop yolladık.
//3)mainjsten sonraa flictactions.js e gitip create ascyn thunk yanımladık
//4)sonra app.jsx te usseffect  dipstch içine ile getflice aksiynunu sevkettik
//5) apiden kordinta alıp index.js te tanımladık
//6) flıaghtactionsta axiosla verileri çağırdk consolda nesne olarak değil dizi olark gelmiş bunu objeye çevirmek gerek map ile objeye çevirdik
//7) fligthslice sayfasın(buraya) gelip extrareducerları tanımladık yani state güncellendi.
//8) mapview e  gidip stora abone olduk uçuş verilerini listelemk gerek
//9)aynı verilere headerda ihtiyaç duyduğumuz için hedaerjsx gidip stora abone olduk
//10)mapp view gidip markerları aktifleştirdik
//11) popup ı aktif etmek için ve hema harita görünümünde hemde liste görünümünde detaya tıklayınca tek bir modalin açılması için apjsx e state açıyoruz. 
