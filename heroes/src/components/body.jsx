import React, { Component,  useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';



function Body() {
    
        const [heroes, setHeroes] = useState([]);
        const [alias, setAlias] = useState('')
        const [list, setList] = useState(true);
        const [card, setCard] = useState(false);
        const [change, setChange] = useState('');
    
        useEffect(() => {
            // componentDidMount
            fetch("http://localhost:8001/heroes")
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setHeroes(res);
                });
        }, []);

        let showCard = (heroName) => {
            fetch(`http://localhost:8001/heroes/${alias}`)
              .then((res) => res.json())
              .then((res) => {
                setHeroes(res.data);
                setList(false);
                setCard(true);
              });
          };

          function handleChange(e) {
            setAlias(e.target.value);
          };

          let showList = () => {
            setCard(false);
            setList(true);
          };

  return (
    <> 
       
   </>
  );
}

export default Body;