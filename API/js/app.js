let ts = Date.now();
const pubkey = '5d0242c75bf0db3974ab970becd60088'; 
const pvtkey = '2398fac7a12ab79277f9b120614c9efdbdccefea';

async function obtenerDatos() {
  let ts = Date.now();
  let hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();
  let endpoint = `https://gateway.marvel.com:443/v1/public/comics?` + `ts=${ts}&apikey=${pubkey}&hash=${hash}`;
        
  try {
    let response = await fetch(endpoint);
    let data = await response.json();
    mostrarCards(data.data.results);
  } catch (error) {
    console.error(error);
  }
}

function mostrarCards(personajes) {
  const container = document.querySelector('#cards-container');
  container.innerHTML = ''; 

  personajes.forEach(personaje => {
    const card = document.createElement('div');
    card.className = 'card';
    card.image = personaje.thumbnail.path;
    card.title = personaje.title;
    card.innerHTML = `
      <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.title}">
      <h2>${personaje.title}</h2>
      `;
    container.appendChild(card);
  })
};

obtenerDatos();