import moment from "moment/moment";
import "moment/locale/tr";

//unix formatındaki veriyi normal formata cevirne fonksiyon
const formatDate = (unix_time) => {
    //unıx formatındaki saniye verisini date ile kullanabilmek için 1000 ile çarpıp milisanieye çevirdik
    const date = new Date(unix_time * 1000);

    //veriyi return etmeden önce formatla
    return moment(date).calendar(); //bugun saat ... da diye çıkıyor.
}

export default formatDate;

//1.47 dakika