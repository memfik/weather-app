import './App.css';
import React, { useEffect, useState } from 'react';
import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import sun from './assets/sun.png'
import Descriptions from './components/Descriptions';
import { getFormattedWeatherData } from './weatherService';


const API_KEY = "05e48d808f5def4154824da2147b9891"


const App = () => {
  const [city,setCity] =useState('Almaty')
  const [weather,setWeather] = useState(null)
  const [units,setUnits] = useState('metric')
  const [bg,setBg] = useState(hotBg)

  useEffect(()=>{
    const fetchWeatherData = async () => {
        const data = await getFormattedWeatherData(city,units)
        console.log(data)
        setWeather(data)

        const threshold = units ==='metric' ? 20 : 60;
        if (data.temp<=threshold) setBg(coldBg);
        else setBg(hotBg);
      };
      fetchWeatherData()
    },[units,city])
  const handleUnitsClick = (e) => {
      const button = e.currentTarget;
      const currentUnit = button.innerText.slice(1)

      const isCelsius = currentUnit === "C"
      button.innerText = isCelsius ? '°F' : '°C'
      setUnits(isCelsius ? 'metric' : 'imperial')
  }
  const enterKeyPressed = (e) => {
    if (e.keyCode ===13){
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }
  
  return(
    <div className='app' style={{backgroundImage:`url(${bg})`}}>
      <div className='overlay'>
        {
          weather && (
            <div className='container'>
              <div className='section section__inputs'>
                <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='Введите город' />
                <button onClick={(e) =>handleUnitsClick(e)}>F°</button>
              </div>
              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{`${weather.name},${weather.country}`}</h3>
                  <img src={weather.iconURL} alt='weather icon' />
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h1>{`${weather.temp.toFixed()} °${units ==='metric' ? 'C' : 'F'}`}</h1>
                </div>
              </div>
              {/* section desc */}
              <Descriptions weather={weather} units={units}/>
            </div>
          )
        }
        
      </div>
    </div>
  )
}

export default App;
