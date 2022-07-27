import Papa from 'papaparse';
import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';
import LineChart from './LineChart';
import BarChart from './BarChart';

const App = () => {
  const [columns, setColumns] = useState([]);
  const [chosenColumnIndex, setChosenColumnIndex] = useState(null);
  const [data, setData] = useState([]); // entire data
  console.log('🚀 ~ file: App.js ~ line 12 ~ App ~ data', data);
  const [microData, setMicroData] = useState([]); // data with regards to chosen column
  const [dataType, setDataType] = useState(null); //should render line or bar chart

  const handleChange = (e) => {
    setChosenColumnIndex(e.target.value);
  };

  useEffect(() => {
    Papa.parse('/house_prices.csv', {
      download: true,
      complete: (res) => {
        setColumns(res.data.shift());
        const data = res.data.reduce((acc, curr) => {
          acc.push(curr);
          return acc;
        }, []);

        setData(data);
      },
    });
  }, []);

  useEffect(() => {
    if (chosenColumnIndex !== null) {
      let localDataType = 'number';

      if (isNaN(Number(data[1][chosenColumnIndex]))) localDataType = 'string';

      let localData, labels;
      const temp = data
        .sort()
        .map((arr) => arr[chosenColumnIndex])
        .reduce((acc, curr) => {
          if (curr in acc) acc[curr] = acc[curr] + 1;
          else acc[curr] = 1;
          return acc;
        }, {});
      console.log('🚀 ~ file: App.js ~ line 51 ~ useEffect ~ temp', temp);

      labels = Object.keys(temp);
      localData = Object.values(temp);

      setMicroData({
        labels,
        datasets: [
          {
            label: 'CSV Data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: localData,
          },
        ],
      });

      setDataType(localDataType);
    }
  }, [chosenColumnIndex]);

  return (
    <Container maxWidth={false}>
      <Grid container justifyContent='center' sx={{ p: 5 }} rowSpacing={5}>
        <Grid item xs={3}>
          <CustomSelect
            value={chosenColumnIndex}
            options={columns}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {dataType !== null &&
            (dataType === 'number' ? (
              <LineChart data={microData} />
            ) : (
              <BarChart data={microData} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
