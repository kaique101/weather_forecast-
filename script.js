document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;
    if(input !==''){
        clearInfo();
        showWarning('Carregando..') // this code BELOW is to get information from the website and the encodeURI converts the string into URL
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ac4943e9fc28b0f7880116c5fec73dc7&units=metric&lang=pt_br`; 
        let results = await fetch(url);
        let json = await results.json();
        if(json.cod === 200){// 200 is the code of the clear wheather with the found city
            showInfo({
                name: json.name,
                country:json.sys.country,
                temperature:json.main.temp,
                tempIcon:json.weather[0].icon,
                windSpeed:json.wind.speed,
                windAngle:json.wind.deg
            });            
        }else {
            clearInfo();
            showWarning ('Não encontramos essa localização.');
        }
    }
});

function showInfo(json){
    showWarning ('');
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temperature} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
    document.querySelector('.resultado').style.display = 'block';


};

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg; // this is the loading mesage
}
function clearInfo(){
    showWarning ('');
    document.querySelector('.resultado').style.display = 'none';
};