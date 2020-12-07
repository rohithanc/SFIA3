import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Col, Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import SiteNavbar from '../SiteNavbar';
import Ticket from '../Ticket';
import Data from './ticket.json';
import DetailedTicket from '../DetailedTicket';
import axios from 'axios';

const ViewTickets = () => {

//pass function to check whether more info is clicked
    const [query, setQuery] = useState(``);
    const [check, setCheck] = useState(false);
    
    const handleQuery = e => {
        console.log("query was " + {query});
        setQuery(e.currentTarget.value);
        console.log(query);
    }
    const handleCheck = e => {
        setCheck(!check);
    }

    const [data,setData]= useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {

            axios.get("http://localhost:8080/ticket/readTickets"
            ,
                {
                    headers: {
                        'Access-Control-Allow-Origin' : '*'
                    }
                }
            )
                // .then(res => res)
                .then(response => {
                    setLoaded(true);
                    console.log(response.data);
                    setData(response.data);
                    console.log(typeof(data));
                }, (error) => {
                    setLoaded(true);
                    setError(error);
                })
        },10000)
    },[])


return(  
<>
<SiteNavbar/>
<Container fluid>
    <Row>
        <Col className="shaded create" sm={4}>This is the side bar
            <DetailedTicket 
            stateQuery={query}

            />
            </Col>
        <Col className="shaded create"  sm={8}>
            {data.map((ticket)=>(
            <Ticket 
            key={ticket.id}
            id={ticket.id} 
            title={ticket.title} 
            author={ticket.author}
            description={ticket.description}
            timeCreated={ticket.timeCreated}
            info={ticket}
            stateQuery={query} 
            updateState={handleQuery} 
            />
            ))}
        </Col>
    </Row>
</Container>
</>
);
}
export default ViewTickets;