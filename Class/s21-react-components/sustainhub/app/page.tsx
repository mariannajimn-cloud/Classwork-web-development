'use client';
import InitiativesCont from '../components/iniciativescont';

export default function Home() {
  return (
    // container visual de la página principal
    <div className="min-h-screen bg-zinc-50 p-8 font-sans">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6">Climate Action Initiatives</h1>
        
        {/*  mandamos a llamar a nuestro bloque de lógica y visual */}
        <InitiativesCont />
      </main>
    </div>
  );
}