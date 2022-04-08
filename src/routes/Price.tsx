import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Content = styled.span`
  display: block;
  margin-bottom: 10px;
`;
interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface IPriceDetail {
  coinId: string;
}
function Price({ coinId }: IPriceDetail) {
  const { isLoading, data } = useQuery<IPrice>(["PriceDetail", coinId], () =>
    fetchCoinTickers(coinId!)
  );
  return (
    <div>
      <Helmet>
        <title>{coinId} - Price</title>
      </Helmet>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <Content>총 시가 : ${data?.quotes.USD.market_cap} </Content>
          <Content>거래량(24H) : ${data?.quotes.USD.volume_24h} </Content>
          <Content>
            변동량(24H) : {data?.quotes.USD.percent_change_24h}%{" "}
          </Content>
          <Content>변동량(7D) : {data?.quotes.USD.percent_change_7d}% </Content>
        </>
      )}
    </div>
  );
}

export default Price;
