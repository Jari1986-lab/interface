import React from 'react';
import ReactDOM from 'react-dom';

import {HTTP} from './http';

 
class ValitsePeli extends React.Component{
    constructor(props){
        super(props);
        this.state={pelit:[],valittu:{id:0,konsoli:'Ei vielä valintaa'}};
    }

    componentDidMount(){
        console.log("Mounted")
        HTTP.get('/api/pelit').then(pelit =>{
            console.log("Pelit",pelit)
            this.setState({pelit});
        });
    }

    valitse(id){
        let valittu=this.state.pelit.find(p => p.id==id);
        this.setState({valittu});
    }

    lisaaClicked(){
        alert("Jefgfp")
        HTTP.post('/api/pelit',{konsoli:'Nes',peli:'Turtles'}).then(p => console.log(p))
    }

    poistaClicked(){
        alert("jep")
        HTTP.delete('/api/pelit')(p => console.log(p))
    }


    
         render(){
        

        
        let valinnat=this.state.pelit.map(p => <option key={p.id}>{p.konsoli} {p.peli}</option>);
        return <div>
            <h2>{this.state.valittu.peli}</h2>
            <select size="15"  value={this.state.valittu.id} onChange={ev => this.valitse(ev.target.value)}>
                {valinnat}
            </select><br></br>
            <input id="klikkaa" type="button" value="lisää" onClick={() => this.lisaaClicked()} />
            <input id="klikkaa2" type="button" value= "poista" onClick={() => this.poistaClicked()}/>

        </div>
    }

}



function Main(props){

    return <div>
        <h2>Pelit</h2>
        <ValitsePeli />
    </div>
}



window.onload=function(){
    ReactDOM.render(<Main />,document.getElementById('appcontent'));
}