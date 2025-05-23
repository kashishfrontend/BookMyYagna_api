import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Calendar from 'react-calendar';
import axios from 'axios';
import moment from 'moment';
import './Panchang.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PanchangCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [panchangDetails, setPanchangDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://astroapi-1.divineapi.com/indian-api/v1/find-panchang';
  const API_KEY = 'ad262a35d5f9ea64eb3bbffddf5c62ec';
  const TOKEN =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RpdmluZWFwaS5jb20vc2lnbnVwIiwiaWF0IjoxNzQ3MzcyNjU4LCJuYmYiOjE3NDczNzI2NTgsImp0aSI6IkpieWt1a3JyTklMQnU0OUkiLCJzdWIiOiIzNjcwIiwicHJ2IjoiZTZlNjRiYjBiNjEyNmQ3M2M2Yjk3YWZjM2I0NjRkOTg1ZjQ2YzlkNyJ9.gWTyHM1RBj9XdfOGhdCwg2qaNjk5EnYAZrZ5_AXqotM';

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const getFormattedDateParts = (dateObj) => ({
    day: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    year: dateObj.getFullYear(),
  });

  const fetchPanchang = async (selectedDate) => {
    setLoading(true);
    const { day, month, year } = getFormattedDateParts(selectedDate);

    const body = {
      api_key: API_KEY,
      day,
      month,
      year,
      place: 'rohtak',
      lat: 28.6139,
      lon: 77.2090,
      tzone: 5.5,
      lan: 'en',
    };

    try {
      const response = await axios.post(API_URL, body, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const { tithis, nakshatras } = response.data.data;
        const currentTithi = tithis[0];
        const nakshatraList = nakshatras.nakshatra_list;

        setPanchangDetails({
          tithi: `${currentTithi.paksha} Paksha, ${currentTithi.tithi}`,
          nakshatra: nakshatraList.map((n) => n.nak_name).join(', '),
          muhurat: `${moment(currentTithi.start_time).format('hh:mm A')} - ${moment(currentTithi.end_time).format('hh:mm A')}`,
        });
      } else {
        setPanchangDetails({
          tithi: 'Not Available',
          nakshatra: 'Not Available',
          muhurat: 'Not Available',
        });
      }
    } catch (error) {
      console.error('Error fetching Panchang:', error);
      setPanchangDetails({
        tithi: 'Error fetching data',
        nakshatra: 'Error fetching data',
        muhurat: 'Error fetching data',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPanchang(date);
  }, [date]);

  const handleDateChange = (newDate) => setDate(newDate);

  return (
    <section className="panchang-calendar-section mt-5">
      <Container>
        <div className="section-header">
          <div className="ornament-line" style={{paddingTop:"35px"}}>
            <span className="om-symbol">ॐ</span>
          </div>
          <div className="section-title">
            <h3>
              Panchang <span>Calendar</span>
            </h3>
          </div>
          <p>Select a date to view the Panchang details, including tithi, nakshatra, and auspicious timings.</p>
        </div>
        <div className="calendar-wrapper">

        <div data-aos="fade-right" data-aos-delay="200" data-aos-duration="1200">
          <Calendar onChange={handleDateChange} value={date}  showNeighboringMonth={false}/>
        </div>
        </div>

          <h4 className="info-heading">Panchang Details for {moment(date).format('MMMM Do YYYY')}</h4>

        <div className="panchang-details" data-aos="fade-up" >

          {loading ? (
            <p className="info-loading">Loading...</p>
          ) : panchangDetails ? (
            <>
              <div className="info-section">
                <h5>• Tithi</h5>
                <p>{panchangDetails.tithi}</p>
              </div>
              <div className="info-section">
                <h5>• Nakshatra</h5>
                <p>{panchangDetails.nakshatra}</p>
              </div>
              <div className="info-section">
                <h5>• Muhurat</h5>
                <p>{panchangDetails.muhurat}</p>
              </div>
            </>
          ) : (
            <p className="info-loading">No Panchang data available.</p>
          )}
        </div>

      </Container>
    </section>
  );
};

export default PanchangCalendar;
