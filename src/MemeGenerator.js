import React from "react";

class MemeGenerator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            font_size:"22",
            topText:"",
            bottomText:"",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        };
    }
    handleChange=e=>{
        const {name,value}=e.target;
        this.setState({[name]:value});
    
    };
    handleClick=()=>{
        let randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length);
        this.setState({ randomImg: this.state.allMemeImgs[randomNumber].url });
      
    };
    increaseFont = () => {};
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
          .then(data => data.json())
          .then(response => {
            const { memes } = response.data;
            this.setState({ allMemeImgs: memes });
          });
      }
    render(){
        return(
            <div>
                <div className="meme-form">
                    <input type="text" name="topText" placeholder="top text" value={this.state.topText} onChange={this.handleChange}/>
                    <br/>
                    <input type="text" name="bottomText" placeholder="bottom text" value={this.state.bottomText} onChange={this.handleChange}/>
                    <br/>
                    <input type="number" name="font_size" placeholder="font size" value={this.state.font_size} onChange={this.handleChange}/>
                    <br/>
                    <button onClick={this.handleClick}>Generate!</button>
                </div>
                <div className="meme">
                    <h2 style={{ fontSize: Number(this.state.font_size)}} className="top">{this.state.topText}</h2>
                    <img src={this.state.randomImg} alt="" />
                    <h2 style={{ fontSize: Number(this.state.font_size) }} className="buttom">{this.state.bottomText}</h2>
                </div>
            </div>
            
        )
    }
}
export default MemeGenerator;

