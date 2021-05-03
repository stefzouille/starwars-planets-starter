import { useState, useEffect } from "react"
import Planet from "./Planet"

const Planets = () => {
  const [planets, setPlanets] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [page, setPage] = useState(1)
   const [hasNext, setHasNext] = useState(null);

 useEffect(() => {
   console.log('use effect start with', page)
    setLoading(true)
    setError("")
    let isCancelled = false
    const controller = new AbortController()
    
    fetch(`https://swapi.dev/api/planets/?page=${page}` ,{
     signal: controller.signal,
  })
      .then((response) => {
        console.log("don't forget me here!!!");
        return new Promise((resolved) => {
          setTimeout(() => resolved(response), 2000);
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Nous n'avons pas pu lire les registres des planètes, status : ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log('i get data')
        console.log(data);
        if (!isCancelled) {
          console.log("i will update component")
        setPlanets((p) => [...p, ...data.results]);
        setHasNext(data.next)
        setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message)
        if (!isCancelled) {
        setError(error.message);
        setLoading(false);
        }
      });
      return () => {
        console.log('clean up')
        console.log("i want to cancel")
        isCancelled = true
        controller.abort()
      }
  }, [page]);

return (
    <>
      <div className="row">
        {planets.map((planet) => {
          return <Planet key={planet.name} planet={planet} />;
        })}
      </div>
      {loading && <p className="text-center">loading...</p>}
      {!!error && <p className="alert alert-danger">{error}</p>}
      {hasNext && (
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={loading}
        >
          Suivantes
        </button>
      )}

      {hasNext === false && (
        <p className="bg-dark text-white p-3">
          Nous avons listé toutes les planètes recensées.
        </p>
      )}
    </>
  );
};




export default Planets
