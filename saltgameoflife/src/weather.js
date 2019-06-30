import React from "react";

//This is the background picture for the Title, it takes the current weather in Stockholm and searchs for
// a picture based on the result.

export default class weatherImage extends React.Component{
    constructor() {
        super();
        this.state = {
        
        };
      }
    componentDidMount (){
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyUrl + 'https://api.darksky.net/forecast/0fbd6ea616be8ee154943af1ddaf6e95/59.334591,18.063240')      
    .then((response) => {
        return response.json();
      })   
    //.then(data =>this.setState({data}));
    .then((data) => {
        return data.currently.summary;
    }).then((data) => {
        let splitStr = data.split(" ");
        return splitStr.join(',');
    }).then(data =>this.setState({data}));
}
    render() {
        let link = `https://source.unsplash.com/360x50/?${this.state.data}/`
        console.log(this.state.data);
    return(
        <div className="image">
            <img src={link} alt=""></img>
        </div>
    )
    }

}