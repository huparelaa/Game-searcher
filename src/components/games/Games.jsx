import "./games.css";
export function Games({ games }) {
  return (
    <>
      <div className="games-container">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <p className="title">{game.name}</p>
            <div className="img-container">
              <img src={game.background_image} alt={game.name} />
            </div>
            <p
              className="rating"
              style={{
                background:
                  game.rating > 4.6
                    ? "darkgreen"
                    : game.rating > 4.0
                    ? "green"
                    : game.rating > 3.0
                    ? "orange"
                    : "red",
              }}
            >
              {parseInt(game.rating * 20)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
