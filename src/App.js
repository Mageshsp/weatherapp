import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from "./assets/search.png"
import cloudIcon from "./assets/cloud.png"
import humidityIcon from "./assets/humidity.png"
import rainIcon from "./assets/rain.png"
import snowIcon from "./assets/snow.png"
import sunIcon from "./assets/sun.png"
import thunderIcon from "./assets/thunder.png"
import windIcon from "./assets/wind.png"
import confusedIcon from "./assets/confused.png"


const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <div className='main'>
      <div className='image'>
        
        <img src={icon} alt='Image' />
      </div>
      <div className='temp'>{temp}° C</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt='Humidity' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{humidity} %</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element wind'>
          <img src={windIcon} alt='Wind' className='icon' />
          <div className='data'>
            <div className='wind-percent'>{wind} Km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
      


    </div>
  )
}


function App() {
  let apiKey="53b800f30d7fe99f4d4fb28a855c7776";
  const [text,setText]=useState("Chennai");

  const [icon, setIcon] = useState();
  const [temp, settemp] = useState(0);
  const [city, setcity] = useState(text);
  const [country, setcountty] = useState("In");
  const [lat, setlat] = useState(0);
  const [log, setlog] = useState(0);
  const [humidity, sethum] = useState(0);
  const [wind, setwind] = useState(0);
  

  const [cityNot,setCityNot]=useState(false);
  const [loading,setLoading]=useState(false);

  const weatherIconMap={
    "01d":sunIcon,
    "01n":sunIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04d":rainIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "04n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "11d":thunderIcon,
    "11n":thunderIcon,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":cloudIcon,
    "50n":cloudIcon,
  }

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setCityNot(true);
        setLoading(false);
        sethum(0);
        setwind(0);
        settemp(Math.floor(0));
        setcity("No City found");
        setcountty("");
        setlat(0);
        setlog(0);
        setIcon(confusedIcon);
        return;
      }
      sethum(data.main.humidity);
      setwind(data.wind.speed);
      settemp(Math.floor(data.main.temp));
      setcity(data.name);
      setcountty(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      setCityNot(false);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || confusedIcon);
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleCity=(e)=>{
    setText(e.target.value)
  }
  const handleKeydown=(e)=>{
    if(e.key==="Enter"){
      search();
    }
  }

  useEffect(function (){
    search();
  },[])
  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text' className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeydown}/>
          <div className='searchIcon'>
            <img src={searchIcon} alt='Search' onClick={()=>search()}/>
          </div>
        </div>
        {loading&&<div>Loading...</div>}
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />
        <p className='copyright'>
          Designed by <span>Magesh</span>
        </p>
      </div>
      </>
  )
}

export default App
