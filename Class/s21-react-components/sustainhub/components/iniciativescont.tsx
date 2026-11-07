// en este archiva va la logica de boton y el grid visual de las inciatives
'use client';
import { useState } from 'react';
import { SAMPLE_INITIATIVES, Initiative } from '../data/initiatives';
import InitiativeCard from './initiativecard';

const InitiativesCont = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>(SAMPLE_INITIATIVES);   // alamcena lista de proyectos y permite actializar con el setinicitives
  // funcion votos, recibe el evento e y el ID del proyecto al que le dieron clic.
  const sumVotes = (e: React.MouseEvent, id: string) => {
    // recorremos la lista con .map() buscando la que coincida con el ID
    setInitiatives(prevInitiatives =>
      prevInitiatives.map(item =>
        item.id === id 
          ? { ...item, votes: item.votes + 1 } // si es la tarjeta correcta sumamos uno al voto
          : item    // si no es la dejamos  igual
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/*  método .map() para recorrer la lista y que tenga diseño cda iniciatve */}
        {initiatives.map((item) => (
            <InitiativeCard 
                key={item.id}          // llave única para identificar elementos de una lista
                item={item}            // le pasamos el objeto con la info de la iniciativa a la tarjeta
                onVote={sumVotes}/>  // pasamos la función de los votos para que el botón sepa qué hacer
      ))}
    </div>
  );
}

export default InitiativesCont; 