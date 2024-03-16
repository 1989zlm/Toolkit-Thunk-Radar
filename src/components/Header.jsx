import { useSelector } from "react-redux";

const Header = () => {
  const flightState = useSelector((store) => store.flightReducer);
  // console.log(flightState);
  return (
    <header>
      <div>
        <img src="/plane-logo.png" />
        <h3>Uçuş Radarı</h3>
      </div>
      <div>
        <p>
          {flightState.isLoading
            ? "Uçuşlar Hesaplanıyor..."
            : flightState.isError
            ? "Üzgünüz hata oluştu"
            : flightState.flights.length + "  Uçuş bulunudu"}
        </p>
      </div>
    </header>
  );
};

export default Header;
