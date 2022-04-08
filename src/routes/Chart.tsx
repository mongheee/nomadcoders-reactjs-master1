import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId!),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      <Helmet>
        <title>{coinId} - Chart</title>
      </Helmet>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              width: 3,
            },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#2ecc71"], stops: [0, 100] },
            },
            colors: ["#f1c40f"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
              x: {
                format: "dd/mm/yy",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
