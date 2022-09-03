import { useState, useEffect } from 'react';
import PokemonDataView from './DataView';
import PokemonErrorView from './ErrorView';
import PokemonPendingView from './PendingView';
import { fetchPokemon } from 'services/pokemon-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!pokemonName) {
      // Первый рендер, pokemonName это пустая строка, не делаем fetch
      return;
    }

    setStatus(Status.PENDING);

    fetchPokemon
      .fetchPokemon(pokemonName)
      .then(pokemon => {
        // Порядок важен!!!! Сначала кладем данные, потом статус.
        setPokemon(pokemon);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [pokemonName]);

  if (status === Status.IDLE) {
    return <div>Введите имя покемона.</div>;
  }

  if (status === Status.PENDING) {
    return <PokemonPendingView pokemonName={pokemonName} />;
  }

  if (status === Status.REJECTED) {
    return <PokemonErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

// import { Component } from 'react';
// import PokemonErrorView from './ErrorView';
// import PokemonDataView from './DataView';
// import PokemonPendingView from './PendingView';
// import { fetchPokemon } from 'services/pokemon-api';

// export default class OldPokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     error: null,
//     status: 'idle',
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       this.setState({ status: 'pending' });

//       fetchPokemon(nextName)
//         .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   };

//   render() {
//     const { pokemon, error, status } = this.state;
//     const { pokemonName } = this.props;

//     if (status === 'idle') {
//       return <div>Введите имя покемона</div>;
//     }

//     if (status === 'pending') {
//       return <PokemonPendingView pokemonName={pokemonName} />;
//     }

//     if (status === 'rejected') {
//       return <PokemonErrorView message={error.message} />;
//     }

//     if (status === 'resolved') {
//       return <PokemonDataView pokemon={pokemon} />;
//     }

//     // return (
//     //   <div>
//     //     {error && <h1>{error.message}</h1>}
//     //     {loading && <div>Загружаем...</div>}
//     //     {!pokemonName && <div>Введите имя покемона</div>}

//     //     {pokemon && (
//     //       <div>
//     //         <p>{pokemon.name}</p>
//     //         <img
//     //           src={pokemon.sprites.other['official-artwork'].front_default}
//     //           width="240"
//     //           alt={pokemon.name}
//     //         />
//     //       </div>
//     //     )}
//     //   </div>
//     // );
//   }
// }
