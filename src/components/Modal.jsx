import axios from "axios";
import { useEffect, useState } from "react";
import { headerOpt } from "../constants";
import formatDate from "../utils/formatDate";
import { setPath } from "../redux/slices/flightSlice";
import { useDispatch } from "react-redux";

const Modal = ({ detailId, close }) => {
  //uçuş detay verisini sadece bu modal içersinde tuutacağımız için başka bir bileşende ihtiyacımız olmadığı için state olarak tuttuk
  const [detail, setDetail] = useState(null);
  //   console.log(detailId);

  const dispatch = useDispatch(); //haritadaki uçak izi

  //!aşağıda..
  //ıd hergüncellediğinde çalışır
  useEffect(() => {
    //çnceki uçuşun verilerini temizle
    setDetail(null);
    //yeni uçuşun detey verilerini al
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        headerOpt
      )
      .then((res) => {
        dispatch(setPath(res.data.trail));
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [detailId]);

  //   console.log(detail);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <button onClick={close}>X</button>
        </p>

        {!detail ? (
          <div className="wrapper">
            <div className="loader">
              <span></span>
            </div>
          </div>
        ) : !detail.aircraft?.model || !detail.airport.origin ? (
          <div>
            <p>Bu uçuşun verileri gizlidir.</p>
          </div>
        ) : (
          <>
            <h2>{detail.aircraft?.model.text}</h2>
            <h2>{detail.aircraft?.model.code}</h2>
            <p>
              <span>Kuyruk Kodu</span>
              <span>{detail.aircraft?.registration}</span>
            </p>
            <img src={detail.aircraft?.images.large[0].src} />

            <p>
              <span>Şirket</span>
              <span>{detail.airline.short}</span>
            </p>

            <p>
              <span>Kalkış</span>
              <a
                target="_blank" //
                href={detail.airport.origin?.website}
              >
                {detail.airport.origin?.name} (
                {detail.airport.origin?.position.country.name})
              </a>
            </p>

            <p>
              <span>Hedef</span>
              <a
                target="_blank" //
                href={detail.airport.destination?.website}
              >
                {detail.airport.destination?.name}(
                {detail.airport.destination?.position.country.name})
              </a>
            </p>

            <p>
              <span>Kalkış zamanı</span>
              <span>{formatDate(detail.time.scheduled?.departure)}</span>
            </p>
            <p>
              <span>Varış zamanı</span>
              <span>{formatDate(detail.time.scheduled?.arrival)}</span>
            </p>

            <p className={detail.status?.icon}>
              <span>{detail.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

//!useeffect ile modal ilk açıldığında veriyi al demiş oluyoruz detailıd her güncellendiğinde veriyi çek dememişiz..bu yuzdendir ki, ikinci uçak bilgisi için maket tıklanınca bir önceki tıklanan uöağın verileri modalde görünğyor..bu yuzden bağımlılık dizini doldurduk
