import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const ListView = ({ setDetailId }) => {
  //uçuş verileri için abone olduk
  const flightState = useSelector((store) => store.flightReducer);
  // console.log(flightState);
  //tıklanılan sayfa verisinin apiden gelmesi için
  // axios.get("18");

  //!paginate dökümantasyonundan kopyaladık api paginate ı desteklemiyor. yani seçili sayfaya göre veri göndermediği için bunu kopyaladık
  //gösterilecek ilk elemanı belirleme statei
  const [itemOffset, setItemOffset] = useState(0);

  //sayfa basına gösterileck eleman sayısı
  const itemsPerPage = 10;

  //son gösterilecek elemanı belirle
  const endOffset = itemOffset + itemsPerPage;

  //belirlenen aralıktaki elemanları alır
  const currentItems = flightState.flights.slice(itemOffset, endOffset);

  //maksimum sayfa sayısını belirle
  const pageCount = Math.ceil(flightState.flights.length / itemsPerPage);

  //heryeni sayfa seçildiğinde çalışır
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % flightState.flights.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-striped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Eylem</th>
            <th>Boylam</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.slice(0, 10).map((item) => (
            <tr>
              <th>{item.id}</th>
              <td>{item.code}</td>
              <td>{item.lat}</td>
              <td>{item.lng}</td>
              <td>
                <button onClick={() => setDetailId(item.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        onPageChange={handlePageClick} //! (e) => console.log(e.selected)} //seçilen sayfası göster
        pageRangeDisplayed={5}
        pageCount={pageCount}
        className="pagination"
        previousLabel="< önceki"
        nextLabel="sonraki >"
      />
    </div>
  );
};

export default ListView;
