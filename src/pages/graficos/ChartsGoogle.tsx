import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";

import {
  getPedidosPorMesAnio,
  getPedidosPorInstrumento,
  getPedidosGroupedByWeek,
} from "../../service/GraficoService";

const ChartsGoogle = () => {
  const [chartType, setChartType] = useState<"mes" | "semana">("mes");
  const [chartData, setChartData] = useState<(string | number)[][]>([
    ["Mes", "Pedidos"],
  ]);
  const [pieChartData, setPieChartData] = useState<(string | number)[][]>([
    ["Instrumento", "Pedidos"],
  ]);

  useEffect(() => {
    let apiFunction;

    switch (chartType) {
      case "mes":
        apiFunction = getPedidosPorMesAnio;
        break;
      case "semana":
        apiFunction = getPedidosGroupedByWeek;
        break;
    }

    apiFunction().then((data) => {
      const chartData = Object.entries(data).map(([key, value]) => [
        key,
        Number(value),
      ]);
      setChartData([["Mes", "Pedidos"], ...chartData]);
    });

    // Obtén los datos para el gráfico de pastel
    getPedidosPorInstrumento().then((data) => {
      const chartData = Object.entries(data).map(([key, value]) => [
        key,
        Number(value),
      ]);
      setPieChartData([["Instrumento", "Pedidos"], ...chartData]);
    });
  }, [chartType]);

  return (
    <>
      <div className="container-fluid text-center">
   
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <select
                value={chartType}
                onChange={(e) =>
                  setChartType(e.target.value as "mes" | "semana")
                }
                style={{ fontSize: "24px", marginBottom: "20px", width: "50%" }}
              >
                <option value="mes">Mes</option>
                <option value="semana">Semana</option>
              </select>
            </div>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                title: `Cantidad de pedidos por ${chartType}`,
                chartArea: { width: "50%" },
                hAxis: {
                  title: `Total de pedidos por ${chartType}`,
                  minValue: 0,
                },
                vAxis: {
                  title: chartType.charAt(0).toUpperCase() + chartType.slice(1),
                },
              }}
            />
          </div>
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={pieChartData}
            options={{
              title: "Pedidos por instrumento",
            }}
          />
        </div>
     <div style={{ width: "100%" }}>
  <Chart
    width={"100%"}
    height={"300px"}
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={chartData}
    options={{
      title: `Cantidad de pedidos por ${chartType}`,
      chartArea: { width: "50%" },
      hAxis: {
        title: `Total de pedidos por ${chartType}`,
        minValue: 0,
      },
      vAxis: {
        title: chartType.charAt(0).toUpperCase() + chartType.slice(1),
      },
    }}
  />
</div>
      </div>

    </>
  );
};

export default ChartsGoogle;
