import React, { useState, useEffect } from 'react';
import './App.css';
import Temp from './Components/Temp.jsx';
import Highlights from './Components/Highlights.jsx';

function App() {
  const [city, setcity] = useState("Delhi");
  const [weatherdata, setweatherdata] = useState(null);

  useEffect(() => {
    const apiurl = `https://api.weatherapi.com/v1/current.json?key=f8d0e7bdf2b04d3ab8a165558240206&q=${city}&aqi=no`;

    fetch(apiurl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setweatherdata(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (
    <div className='bg-[#1f213a] w-full h-screen flex justify-center align-top'>
      <div className='mt-40 w-1/5 h-1/3'>
        {weatherdata && (
          <Temp
            setcity={setcity}
            stats={{
              temp: weatherdata.current.temp_c,
              condition: weatherdata.current.condition.text,
              isDay: weatherdata.current.is_day,
              location: weatherdata.location.name,
              time: weatherdata.location.localtime,
            }}
          />
        )}
      </div>
      <div className='mt-40 w-1/3 h-1/3 grid grid-cols-2 gap-6'>
        <h1 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h1>
        {weatherdata && (
            <>
              <Highlights 
               stats={{
                title: "Wind Status",
                value: weatherdata.current.wind_mph,
                unit: "mph",
                direction: weatherdata.current.wind_dir,
               }}

              />
              <Highlights 
              stats={{
                title: "Humidity",
                value: weatherdata.current.humidity,
                unit: "%",
              }}
              />
              <Highlights 
                 stats={{
                  title: "Visibility",
                  value: weatherdata.current.vis_miles,
                  unit: "miles",
                 }}
              />
              <Highlights 
                 stats={{
                  title: "Air Pressure",
                  value: weatherdata.current.pressure_mb,
                  unit: "mb",
                 }}
              />
            </>
        )
     }
      </div>
    </div>
  );
}

export default App;

// here in 19th line col-span-2 will give two colums to our heading
//res.ok is used to check wheather data received is in the response form or 
//here stats={{}} is a object which we passing as a prop. 
//{weatherdata && we are using this beacuse we are check if weatherdata is present or if we have data the only render the temp component