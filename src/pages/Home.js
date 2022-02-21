import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;
function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MM DD YYYYY  HH:mm");
    var selectedTo = moment(values[1], "MM DD YYYYY  HH:mm ");
    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.From, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }
    console.log(temp);
    setTotalcars(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker onChange={setFilter} />
        </Col>
      </Row>

      {loading && <Spinner />}

      <Row justify="center" gutter={16} className="mt5">
        {Array.isArray(totalCars) &&
          totalCars.map((car, index) => {
            console.log("car: ", car);
            return (
              <Col key={index} lg={5} sm={24} xs={24}>
                <div className="car p-2 bs1 my-3">
                  <img src={car.image} className="carimg" />
                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div className="text left pl-2">
                      <p>{car.Name}</p>
                      <p> Rent Per Hour{car.rentPerHour}/- </p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <button className="btn1 mr-2">
                        <Link to={`/booking/${car._id}`}>submit</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
