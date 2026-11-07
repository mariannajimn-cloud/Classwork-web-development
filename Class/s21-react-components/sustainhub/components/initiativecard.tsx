'use client';
import Link from 'next/link';        // link that does not refresh the page
import {Initiative} from '../data/initiatives';

// definimos las propiedades que este componente necesita recibir desde afuera  CHECAR!!!!!
interface InitiativeCardProps {
  item: Initiative;                                    // los datos de la iniciativa
  onVote: (e: React.MouseEvent, id: string) => void;   // función para manejar el evento de votación
}

// declaramos componente
const InitiativeCard = ({ item, onVote }: InitiativeCardProps) => {
  return (
    <Link 
      href={`/project/${item.id}`}  //{item.id} para mandar el ID exacto a la ruta
      className="flex flex-col justify-between bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition">
      {/* contenedor superior de la tarjeta */}
      <div>
        {/* etiqueta que muestra categoría */}
        <span className="text-xs font-semibold uppercase bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md">
          {item.category}
        </span>
        
        {/* mostrar el título del proyecto que viene dentro de item */}
        <h3 className="font-bold text-lg text-zinc-800 mt-3">{item.title}</h3>
      </div>

      {/* contenedor inferior de la tarjeta que muestra los votos y el botón */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-100">
        
        {/* Muestra el número actual de votos */}
        <span className="text-sm font-medium text-emerald-600">{item.votes} votes</span>
        
        {/* boton de votación */}
        <button onClick={(e) => {
            e.preventDefault(); // evita que al hacer clic en el botón se abra la página de detalles por error.
            onVote(e, item.id); // ejecuta la función de votar que vino desde page, pasándole el ID.
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"> 
          VOTE
        </button>
      </div>
    </Link>
  );
};

export default InitiativeCard;