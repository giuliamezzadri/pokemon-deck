import { useState } from "react";
//import "./App.css";

function App() {
  const pokemons = [
    { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
    { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
    { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
    { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
    { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
    { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
    { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
    { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
    { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
    { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
    { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
    { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
    { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
    { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
    { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
    { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
    { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
    { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
    { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
    { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
  ];

  const typeColors = {
    Fire: "#FF6B3D", // vivid orange-red
    Water: "#3DA9FC", // bright clear blue
    Grass: "#4CAF50", // fresh green
    Electric: "#FFD60A", // strong yellow
    Psychic: "#C77DFF", // vibrant purple
    Normal: "#9E9E9E", // neutral gray (still visible)
    Ghost: "#5E60CE", // deep indigo
    Dragon: "#4361EE", // royal blue
    Fighting: "#F94144", // strong red
    Rock: "#C2A83E", // earthy gold
  };

  const [hoveredPokemon, setHoveredPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("id");

  const types = ["All", ...new Set(pokemons.map((p) => p.type))];

  const filteredPokemons = pokemons
    .filter((p) => selectedType === "All" || p.type === selectedType)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name); // A → Z
    } else if (sortOption === "hp") {
      return b.hp - a.hp; // highest → lowest
    } else if (sortOption === "atk") {
      return b.attack - a.attack;
    } else if (sortOption === "id") {
      return a.id - b.id; // lowest → highest
    }
    return 0;
  });

  const nSelectedPokemons = filteredPokemons.length;

  return (
    <>
      <h1 style={{ marginBottom: "15px" }}>
        Poké<strong>deck</strong>
      </h1>
      <p style={{ marginBottom: "15px", fontSize: "15px" }}>
        {nSelectedPokemons} of {pokemons.length} Pokémons
      </p>
      <div
        style={{
          margin: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Type Pokémon name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginRight: "8px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="id">Sort by: #ID</option>
          <option value="name">Sort by: Name (A → Z)</option>
          <option value="hp"> Sort by: HP (highest → lowest)</option>
          <option value="atk">Sort by: Attack (highest → lowest)</option>
        </select>
      </div>
      <div>
        {types.map((type, i) => (
          <button
            key={i}
            onClick={() => setSelectedType(type)}
            style={{
              margin: "5px",
              padding: "10px 10px",
              backgroundColor: selectedType === type ? "#ccc" : "#eee",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          padding: "20px",
          gridTemplateColumns: "repeat(auto-fit, 180px)",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {sortedPokemons.map((pokemon, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredPokemon(pokemon.id)}
            onMouseLeave={() => setHoveredPokemon(null)}
            style={{
              width: "180px",
              backgroundColor:
                hoveredPokemon === pokemon.id ? "#f8f8f8" : "white",
              border: "1.5px solid #eee",
              borderRadius: "10px",
              padding: "15px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* ID top-left */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "10px",
                fontFamily: "monospace",
                fontSize: "12px",
                opacity: 0.6,
              }}
            >
              #{String(pokemon.id).padStart(3, "0")}
            </div>
            {/* Image */}
            <img
              style={{
                width: "90px",
                marginTop: "12px",
                marginBottom: "3px",
              }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            />
            {/* Name */}
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                margin: "5px 0",
                textAlign: "center",
              }}
            >
              {pokemon.name}
            </h2>
            {/* Type */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "0px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: typeColors[pokemon.type],
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "14px" }}>{pokemon.type}</span>
            </div>
            {/* Stats */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0px",
                marginTop: "auto", // 👈 pushes stats toward bottom nicely
              }}
            >
              <div style={{ fontSize: "14px" }}>
                HP: <span style={{ fontWeight: "600" }}>{pokemon.hp}</span>
              </div>
              <div style={{ fontSize: "14px" }}>
                ATK: <span style={{ fontWeight: "600" }}>{pokemon.attack}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
