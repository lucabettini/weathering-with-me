(()=>{"use strict";const t=document.getElementsByClassName("location-searchbar")[0],e=document.getElementsByClassName("coordinates-searchbar")[0],n=document.getElementsByClassName("search-by-link")[0];function r(t,e,n,r,a,o){this.temp=t,this.humidity=e,this.windSpeed=n,this.weather=r,this.icon=a,this.timestamp=o}function a(t){let e={},n=new Date(1e3*t.current.dt);return n=n.toLocaleString(),e.current=new r(t.current.temp,t.current.humidity,t.current.wind_speed,t.current.weather[0].description,t.current.weather[0].icon,n),e.daily=function(t){let e=[];for(let n=1;n<6;n++){let a=new Date(1e3*t.daily[n].dt);a=a.toLocaleDateString();let o=new r(t.daily[n].temp,t.daily[n].humidity,t.daily[n].wind_speed,t.daily[n].weather[0].description,t.daily[n].weather[0].icon,a);e.push(o)}return e}(t),e}function o(t,e,n){let r=document.getElementById(t);null!=e&&r.classList.remove(e),null!=n&&r.classList.add(n)}function c(t){o("title","title--big","title--small"),o("title-icons",null,"hide"),o("searchbar","searchbar-center",null),document.documentElement.clientWidth>990?(o("location-searchbar","form-control-lg","form-control-md"),o("location-btn",null,"btn-md"),o("latitude-searchbar","form-control-lg","form-control-md"),o("longitude-searchbar","form-control-lg","form-control-md"),o("coordinates-btn","btn-lg","btn-md")):(o("location-searchbar","form-control-lg","form-control-sm"),o("location-btn",null,"btn-sm"),o("latitude-searchbar","form-control-lg","form-control-sm"),o("longitude-searchbar","form-control-lg","form-control-sm"),o("coordinates-btn","btn-lg","btn-sm")),o("current-container","hide",null),o("forecast-container","hide",null),function(t){document.getElementById("current-location").textContent="Weather near "+t[0],document.getElementById("current-icon").src=function(t){let e=t.replace(/["]+/g,"");return"3"!==e.charAt(1)&&"4"!==e.charAt(1)&&"5"!==e.charAt(0)||(e="d"===e.charAt(2)?"02d":"02n"),`./img/${e}.svg`}(t[1].current.icon),document.getElementById("current-temperature").textContent=Math.round(t[1].current.temp)+"° C";let e=t[1].current.weather;document.getElementById("current-weather").textContent=""+(e.charAt(0).toUpperCase()+e.slice(1)),document.getElementById("current-humidity").textContent=`Humidity: ${t[1].current.humidity}%`,document.getElementById("current-wind").textContent=`Wind speed: ${t[1].current.windSpeed} m/s`}(t),function(t){let e=document.getElementsByClassName("forecast-data"),n=document.getElementsByTagName("tr");for(let r=0;r<5;r++){let a=t[1].daily[r].timestamp;a=a.replace(/["]+/g,""),a=a.substring(0,5),"/"===a[a.length-1]&&(a=a.substring(0,4)),e[r].innerHTML="",e[r].innerHTML=a;let o=Math.round(t[1].daily[r].temp.day)+"°",c=t[1].daily[r].weather,i=t[1].daily[r].humidity+"%",l=""+t[1].daily[r].windSpeed,s=n[r+1].getElementsByTagName("td")[0];s.innerHTML="",s.innerHTML=o;let d=n[r+1].getElementsByTagName("td")[1];d.innerHTML="",d.innerHTML=c;let m=n[r+1].getElementsByTagName("td")[2];m.innerHTML="",m.innerHTML=i;let u=n[r+1].getElementsByTagName("td")[3];u.innerHTML="",u.innerHTML=l}}(t)}function i(){(async function(t){const e=await async function(t){const e=await async function(t){const e=await fetch(`https://app.geocodeapi.io/api/v1/search?apikey=c2d64190-1217-11eb-959b-d5373dcdfc58&text=${encodeURIComponent(t)}&size=1`,{mode:"cors"}),n=await e.json();return{location:n.features[0].properties.label,lat:n.features[0].geometry.coordinates[1],long:n.features[0].geometry.coordinates[0]}}(t),n=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${e.lat}&lon=${e.long}&units=metric&appid=b9b2203986268431c767044098ceb209`,{mode:"cors"}),r=await n.json();return[e.location,r]}(t);return[e[0],a(e[1])]})(document.getElementById("location-searchbar").value).then((t=>{c(t)}))}$((function(){$('[data-toggle="tooltip"]').tooltip()}));let l="location";document.getElementsByClassName("search-by-link")[0].addEventListener("click",(r=>{r.preventDefault(),"location"===l?(n.innerHTML="Search by location",t.classList.add("hide"),e.classList.remove("hide"),l="coordinates"):(n.innerHTML="Search by coordinates",t.classList.remove("hide"),e.classList.add("hide"),l="location")})),document.forms.locationSearchbar.addEventListener("submit",(t=>{t.preventDefault(),i()})),document.forms.coordinatesSearchbar.addEventListener("submit",(t=>{t.preventDefault(),async function(t,e){const n=await async function(t,e){const n=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${t}&lon=${e}&units=metric&appid=b9b2203986268431c767044098ceb209`,{mode:"cors"});return[`${t}°, ${e}°`,await n.json()]}(t,e);return[n[0],a(n[1])]}(document.getElementById("latitude-searchbar").value,document.getElementById("longitude-searchbar").value).then((t=>{c(t)}))}))})();