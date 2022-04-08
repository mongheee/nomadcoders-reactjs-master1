const BASE_URL = `https://api.coinpaprika.com/v1`;
export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((reponse) => reponse.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((reponse) => reponse.json());
}
export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((reponse) =>
    reponse.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7; // 일주일 전
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((reponse) => reponse.json());
}
