(()=>{"use strict";const e=document.getElementsByClassName("location-searchbar")[0],t=document.getElementsByClassName("coordinates-searchbar")[0],n=document.getElementsByClassName("search-by-link")[0];function a(e,t,n,a,r,i){this.temp=e,this.humidity=t,this.windSpeed=n,this.weather=a,this.icon=r,this.timestamp=i}function r(e){let t={},n=new Date(1e3*e.current.dt);return n=n.toLocaleString(),t.current=new a(e.current.temp,e.current.humidity,e.current.wind_speed,e.current.weather[0].description,e.current.weather[0].icon,n),t.daily=function(e){let t=[];for(let n=1;n<6;n++){let r=new Date(1e3*e.daily[n].dt);r=r.toLocaleDateString();let i=new a(e.daily[n].temp,e.daily[n].humidity,e.daily[n].wind_speed,e.daily[n].weather[0].description,e.daily[n].weather[0].icon,r);t.push(i)}return t}(e),t}function i(e,t,n){let a=document.getElementById(e);null!=t&&a.classList.remove(t),null!=n&&a.classList.add(n)}function o(e){i("title","title--big","title--small"),i("title-icons",null,"hide"),i("searchbar","searchbar-center",null),i("location-searchbar","form-control-lg","form-control-sm"),i("location-btn",null,"btn-sm"),i("latitude-searchbar","form-control-lg","form-control-sm"),i("longitude-searchbar","form-control-lg","form-control-sm"),i("coordinates-btn","btn-lg","btn-sm"),i("current-container","hide",null),i("forecast-container","hide",null),function(e){document.getElementById("current-location").textContent=`Weather near ${e[0]}`,document.getElementById("current-icon").src=function(e){let t=e.replace(/["]+/g,"");return"0"===t.charAt(0)?"3"!==t.charAt(1)&&"4"!==t.charAt(1)||(t="d"===t.charAt(2)?"02d":"02n"):"5"===t.charAt(0)&&(t="d"===t.charAt(2)?"02d":"02n"),`./img/${t}.svg`}(e[1].current.icon),document.getElementById("current-temperature").textContent=`${Math.round(e[1].current.temp)}° C`;let t=e[1].current.weather;document.getElementById("current-weather").textContent=`${t.charAt(0).toUpperCase()+t.slice(1)}`,document.getElementById("current-humidity").textContent=`Humidity: ${e[1].current.humidity}%`,document.getElementById("current-wind").textContent=`Wind speed: ${e[1].current.windSpeed} m/s`}(e),function(e){let t=document.getElementsByClassName("forecast-data"),n=document.getElementsByTagName("tr");for(let a=0;a<5;a++){let r=e[1].daily[a].timestamp;r=r.replace(/["]+/g,""),r=r.substring(0,5),"/"===r[r.length-1]&&(r=r.substring(0,4)),t[a].innerHTML="",t[a].innerHTML=r;let i=`${Math.round(e[1].daily[a].temp.day)}°`,o=e[1].daily[a].weather,c=`${e[1].daily[a].humidity}%`,l=`${e[1].daily[a].windSpeed}`,s=n[a+1].getElementsByTagName("td")[0];s.innerHTML="",s.innerHTML=i;let d=n[a+1].getElementsByTagName("td")[1];d.innerHTML="",d.innerHTML=o;let u=n[a+1].getElementsByTagName("td")[2];u.innerHTML="",u.innerHTML=c;let m=n[a+1].getElementsByTagName("td")[3];m.innerHTML="",m.innerHTML=l}}(e)}function c(){(async function(e){const t=await async function(e){const t=await async function(e){const t=await fetch(`https://app.geocodeapi.io/api/v1/search?apikey=c2d64190-1217-11eb-959b-d5373dcdfc58&text=${encodeURIComponent(e)}&size=1`,{mode:"cors"}),n=await t.json();return{location:n.features[0].properties.label,lat:n.features[0].geometry.coordinates[1],long:n.features[0].geometry.coordinates[0]}}(e),n=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${t.lat}&lon=${t.long}&units=metric&appid=b9b2203986268431c767044098ceb209`,{mode:"cors"}),a=await n.json();return[t.location,a]}(e);return[t[0],r(t[1])]})(document.getElementById("location-searchbar").value).then((e=>{o(e)}))}$((function(){$('[data-toggle="tooltip"]').tooltip()}));let l="location";document.getElementsByClassName("search-by-link")[0].addEventListener("click",(a=>{a.preventDefault(),"location"===l?(n.innerHTML="Search by location",e.classList.add("hide"),t.classList.remove("hide"),l="coordinates"):(n.innerHTML="Search by coordinates",e.classList.remove("hide"),t.classList.add("hide"),l="location")})),document.forms.locationSearchbar.addEventListener("submit",(e=>{e.preventDefault(),c()})),document.forms.coordinatesSearchbar.addEventListener("submit",(e=>{e.preventDefault(),async function(e,t){const n=await async function(e,t){const n=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${e}&lon=${t}&units=metric&appid=b9b2203986268431c767044098ceb209`,{mode:"cors"});return[`${e}°, ${t}°`,await n.json()]}(e,t);return[n[0],r(n[1])]}(document.getElementById("latitude-searchbar").value,document.getElementById("longitude-searchbar").value).then((e=>{o(e)}))}))})();