import "./games.css";
function ListOfGames({ games }) {
  return (
    <>
      <div className="games-container">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <p className="title">{game.name}</p>
            <div className="img-container">
              {game.image ?  <img src="https://avatars.githubusercontent.com/u/81880485?s=400&u=494eceef3d916066283f1f9e3643f1fceaa2c843&v=4"/>: <img src={game.background_image} alt={game.name}/>}
              
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

function NoGameFound() {
  return <h1 className="no-game-found">No encontramos juegos con la información proporcionada :(</h1>;
}

export function Games({ games }) {
  const hasGames = games?.length > 0;
  return hasGames ? <ListOfGames games={games} /> : <NoGameFound />;
}
