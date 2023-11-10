import state from '@renderer/store';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSnapshot } from 'valtio';

interface Props {
  id: string;
  title: string;
  group: string;
  height: number;
  isPaused: boolean;
  filtered: boolean;
}

export default function RealtimeChart({ id, title, group, height, isPaused, filtered }: Props) {
  const snap = useSnapshot(state);

  const [series, setSeries] = useState(
    snap.data['filtered'].map((item) => ({
      name: item.name,
      data: []
    }))
  );
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    if (snap.isReset) {
      setSeries(
        snap.data['filtered'].map((item) => ({
          name: item.name,
          data: []
        }))
      );
      setCurrentIndex(1);
      state.isReset = false;
    }
  }, [snap.isReset]);

  const [options, setOptions] = useState({
    chart: {
      id,
      group,
      height,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
          //@ts-ignore
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        },
        export: {
          csv: {
            filename: 'Data',
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: 'Image'
          },
          png: {
            filename: 'Image'
          }
        }
      },
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'numeric',
      // min: 0,
      range: 20
    },
    yaxis: {
      // min: snap.boundaries[filtered ? 'filtered' : 'unfiltered'].min,
      // max: snap.boundaries[filtered ? 'filtered' : 'unfiltered'].max
    }
  });

  useEffect(() => {
    const interval = setInterval(addDataPoint, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [series, isPaused]);

  const addDataPoint = () => {
    if (!isPaused) {
      // @ts-ignore
      setSeries((prevSeries) => {
        const updatedSeries = prevSeries.map((item, i) => ({
          ...item,
          data: [
            ...item.data,
            {
              x: series[0].data.length,
              y: snap.data[filtered ? 'filtered' : 'unfiltered'][i].data[currentIndex].y.toFixed(2)
            }
          ]
        }));
        return updatedSeries;
      });
      setCurrentIndex((i) => i + 1);
    }
  };

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      chart: {
        ...prevOptions.chart,
        toolbar: {
          ...prevOptions.chart.toolbar,
          show: isPaused,
          pan: isPaused
        }
      }
    }));
  }, [isPaused]);

  return (
    <div className="shadow-md rounded-xl bg-gray-300/20 max-w-7xl mx-auto pt-4">
      <h2 className="mx-8 -mb-8 text-2xl text-center text-gray-800 font-semibold">{title}</h2>
      <ReactApexChart
        // @ts-ignore
        options={options}
        series={series}
        type="line"
        height={350}
        className="mr-[4rem]"
      />
    </div>
  );
}
