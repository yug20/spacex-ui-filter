import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RocketDetails from './components/RocketDetails';
import {
  fetchRocketDetails,
  rocketDetailsSelector,
} from './slices/fetchRocketDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import queryString from 'query-string';
import moment from 'moment';

const App = () => {
  const BASE_URL = 'https://api.spacexdata.com/v3/launches';
  const dispatch = useDispatch();
  const initialValues = {
    items: [],
    isLoaded: false,
    filters: {
      limit: 150,
      launch_year: undefined,
      launch_success: undefined,
      upcoming: undefined,
      month: undefined,
      rocket_name: undefined,
    },
  };
  const [values, setValues] = useState(initialValues);
  const lastYear = moment().subtract(1, 'year').format('YYYY');
  const lastMonth = moment().format('MMMM') + ' ' + moment().format('YYYY');
  console.log(lastYear);
  const { rocketDetails, loading, hasErrors } = useSelector(
    rocketDetailsSelector
  );

  useEffect(() => {
    let filterUrl =
      (values.filters.upcoming ? BASE_URL + '/upcoming' : BASE_URL) +
      '?' +
      queryString.stringify({ ...values.filters });
    dispatch(fetchRocketDetails(filterUrl));
  }, [dispatch, values.filters]);

  const updateApiFilters = (type, value) => {
    if (values.filters[type] === value) {
      value = undefined;
    }

    setValues((prevValues) => {
      return {
        ...prevValues,
        filters: { ...prevValues.filters, [type]: value },
      };
    });
  };
  const rocketList = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;
    return (
      <Row>
        {rocketDetails.map((details) => (
          <Col md={12} lg={4} key={Math.random()}>
            <RocketDetails details={details} />
          </Col>
        ))}
      </Row>
    );
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={6} lg={3}>
          <Card className="App-filter-card">
            <Card.Body>
              <Card.Title className="App-filter-header">Search</Card.Title>
              <Card.Text className="App-filter-heading-launch-year">
                By Rocket Name
              </Card.Text>
              <div className="App-filter-button-container">
                <Form.Control
                  type="text"
                  placeholder="Input here..."
                  onBlur={(e) =>
                    updateApiFilters('rocket_name', e.target.value)
                  }
                />
              </div>
            </Card.Body>
          </Card>
          <Card className="App-filter-card">
            <Card.Body>
              <Card.Title className="App-filter-header">Filters</Card.Title>
              <Card.Text className="App-filter-heading-launch-year">
                Last Year
              </Card.Text>
              <div className="App-filter-button-container">
                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.launch_year === lastYear.toString()
                      ? 'success'
                      : 'outline-success'
                  }
                  value={lastYear}
                  onClick={(e) =>
                    updateApiFilters('launch_year', e.target.value)
                  }
                  key={Math.random()}
                >
                  {lastYear}
                </Button>
              </div>
              <Card.Text className="App-filter-heading-launch-year">
                Last Month
              </Card.Text>
              <div className="App-filter-button-container">
                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.month === lastMonth.toString()
                      ? 'success'
                      : 'outline-success'
                  }
                  value={lastMonth}
                  onClick={(e) => updateApiFilters('month', e.target.value)}
                  key={Math.random()}
                >
                  {lastMonth}
                </Button>
              </div>

              <Card.Text className="App-filter-heading">
                Successful Launch
              </Card.Text>

              <div className="App-filter-button-container">
                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.launch_success === 'true'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) =>
                    updateApiFilters('launch_success', e.target.value)
                  }
                  value="true"
                >
                  True
                </Button>

                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.launch_success === 'false'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) =>
                    updateApiFilters('launch_success', e.target.value)
                  }
                  value="false"
                >
                  False
                </Button>
              </div>

              <Card.Text className="App-filter-heading">
                Is it upcoming?
              </Card.Text>
              <div className="App-filter-button-container">
                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.upcoming === 'true'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) => updateApiFilters('upcoming', e.target.value)}
                  value="true"
                >
                  True
                </Button>

                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.land_success === 'false'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) =>
                    updateApiFilters('land_success', e.target.value)
                  }
                  value="false"
                >
                  False
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={9}>
          {rocketList()}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
