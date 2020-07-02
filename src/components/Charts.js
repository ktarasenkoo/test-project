import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stopFetching, resumeFetching, getData, updateData } from '../actions';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries
} from 'react-vis';
import { toast } from 'react-toastify';

const Charts = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);

  const error = useSelector((store) => store.data.data.error);

  const data = useSelector((store) => store.data.data);

  const nasdaqCoords = useSelector((store) => {
    return store.data.data.map(({ index, stocks }) => ({ x: index, y: stocks.NASDAQ }));
  });

  const cac40Coords = useSelector((store) => {
    return store.data.data.map(({ index, stocks }) => ({ x: index, y: stocks.CAC40 }));
  });

  useEffect(() => {
    if (!start) {
      dispatch(getData());
      setStart(true);
    }
  }, [start]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: 'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleFocus = () => dispatch(stopFetching());

  const handleBlur = () => dispatch(resumeFetching());

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    const index = parseInt(e.target.getAttribute('data-index'));
    const name = e.target.getAttribute('data-name');
    const timestamp = parseInt(e.target.getAttribute('data-timestamp'));
    const dataAnother = parseFloat(e.target.getAttribute('data-another'));

    dispatch(updateData({
      timestamp,
      index,
      stocks: {
        NASDAQ: name === 'NASDAQ' ? value : dataAnother,
        CAC40: name === 'CAC40' ? value : dataAnother,
      },
    }));
  };

  return (
    <div id="container">
      <XYPlot
        width={window.innerWidth}
        height={window.innerHeight * 0.7}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries
          data={nasdaqCoords}
        />
        <LineSeries
          data={cac40Coords}
        />
        <XAxis />
        <YAxis />
      </XYPlot>
      <table>
        <tbody>
          <tr>
            <td>NASDAQ</td>
            {
              data.map(({ index, timestamp, stocks }) => (
                <td key={index}>
                  <input
                    data-index={index}
                    data-name="NASDAQ"
                    data-timestamp={timestamp}
                    data-another={stocks.CAC40}
                    defaultValue={stocks.NASDAQ}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </td>
              ))
            }
          </tr>
          <tr>
            <td>CAC40</td>
            {
              data.map(({ timestamp, index, stocks }) => (
                <td key={index}>
                  <input
                    data-index={index}
                    data-name="CAC40"
                    data-timestamp={timestamp}
                    data-another={stocks.NASDAQ}
                    defaultValue={stocks.CAC40}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </td>
              ))
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Charts;
