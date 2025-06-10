import { Carta, Tablero } from "./modelo";
const barajarCartas = (cartas: Carta[]): Carta[] => {
  //...
  for (let i = cartas.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [{ ...cartas[i] }, { ...cartas[j] }] = [cartas[j], cartas[i]];
  }
  return cartas;
};

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  //..
  const carta = tablero.cartas[indice];
  return (
    carta.encontrada === false &&
    carta.estaVuelta === false &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
    tablero.indiceCartaVolteadaB = indice;
  }
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  //...
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];
  cartaA.estaVuelta = false;
  cartaB.estaVuelta = false;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  barajarCartas(tablero.cartas);
};
