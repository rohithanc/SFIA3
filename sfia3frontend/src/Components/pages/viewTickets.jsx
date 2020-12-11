import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col, Container } from "react-bootstrap";
import SiteNavbar from "../SiteNavbar";
import Ticket from "../Ticket";
import DetailedTicket from "../DetailedTicket";
import TicketInfo from "../Ticketinfo";
import axios from "axios";
import { PATH } from "../../constants.json";

const ViewTickets = () => {
  //pass function to check whether more info is clicked
  const [currentTicket, setCurrentTicket] = useState({});

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://api/readTickets", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        // .then(res => res)
        .then(
          (response) => {
            setLoaded(true);
            console.log(response.data);
            setData(response.data);
            console.log(typeof data);
          },
          (error) => {
            setLoaded(true);
            setError(error);
          }
        );
    }, 0);
  });

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="shaded create" sm={4}>
            {" "}
            {currentTicket && <TicketInfo info={currentTicket} />}
          </Col>
          <Col className="shaded create" sm={8}>
            {data.map((ticket) => (
              <Ticket
                key={ticket.id}
                id={ticket.id}
                title={ticket.title}
                author={ticket.author}
                description={ticket.description}
                timeCreated={ticket.timeCreated}
                info={ticket}
                updateState={(ticket) => setCurrentTicket(ticket)}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ViewTickets;
