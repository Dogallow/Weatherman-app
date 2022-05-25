let weather = {
    apiKey: '698d1977c52537da2f16503ee1027518',
    getLocation: function(city){
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.apiKey}`)
        .then((response)=>response.json())
        .then((data)=>{
            let {lon} = data[0]
            let {lat} = data[0]
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`)
            .then((res)=> res.json())
            .then((data)=>{
                console.log(data)
                this.displayWeather(data)
            })



        })
    },
    displayWeather: function(data){
        let {name}=data
        let {temp}=data.main
        let {description, icon} = data.weather[0];
        let {speed} = data.wind
        console.log(name, temp)
        document.querySelector('.city').innerText = `The weather in ${name} is`
        document.querySelector('.temp').innerText = `${temp}°F`
        document.querySelector('.description').innerText=`${description} `
        document.querySelector('.wind').innerText=`wind speeds are ${speed}mph`
        document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        document.body.style.backgroundImage= "url('https://source.unsplash.com/1600x900/?"+name+"')"
        document.querySelector('.weather-description').classList.remove('loading')
    }
}



let button = document.querySelector('.search-button')
button.addEventListener('click', function(){
    weather.getLocation(document.querySelector('.search-bar').value)
    console.log('hello')
    document.querySelector('.search-bar').value=""

})

let searchBar = document.querySelector('.search-bar')
searchBar.addEventListener('keyup', function(e){
    console.log(e.key)
    if(e.key=="Enter"){
        weather.getLocation(searchBar.value)
        searchBar.value=""
    }
})

weather.getLocation('Modesto')
