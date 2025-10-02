import Navbar from '../components/Navbar.jsx'

export default function Pokedex() {
    return (
        <div className="bg-[#EA202D] min-h-screen">
            <Navbar />

            <div className="pt-16">
                <h1 className="text-white text-3xl p-6">Pokédex</h1>
            </div>
        </div>
    )
}