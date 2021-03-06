import React, {useEffect} from 'react'
import axios from 'axios'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem } from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {setCurrentClient} from '../../redux/actions/index'
import {useHistory, useParams} from 'react-router-dom';
import DefaultPicture from '../../images/default-profile-picture.png'


function ClientDetails(props) {
    const history = useHistory();
    let { id } = useParams();

    useEffect(() => {
        if(props.client.name.firstName === ""){
            axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((req) => {
                props.setCurrentClient(req.data)
            })
        }
      });
    return ( 

    <Container className="container-fluid">
        <Jumbotron className="mt-3">
            <div className="d-flex">
                <img src={DefaultPicture} style={{width: '10em'}}/>
                <div>
                    <h7>Client Name:</h7>
                    <h1 className="display-4">{props.client.name.firstName}</h1>
                </div>
            </div>
            <hr className="my-2" />
            <h3>Recent Activity</h3>
            <h3 className="d-flex justify-content-center">
                No recent activity
            </h3>
            <hr className="my-2" />
            <h3>Current Program</h3>
            {props.client.routines !== null ?
                <ListGroup className="d-flex justify-content-center">
                {props.client.routines.map((routine) =>
                <ListGroupItem>
                    {routine.name}
                </ListGroupItem>
                    
                )}
                </ListGroup>
                :
                <h3 className="d-flex justify-content-center">
                    Subscriber currently does not have a program assigend 
                </h3>
                
            }
            <div className="clearfix">
                <Button className="mt-3 float-right" onClick={() => history.push(`/createProgram/${props.client._id}`)}>Create new Program</Button>
            </div>
            <hr className="my-2" />
            <Button onClick={() => history.push('/Clients')}> Back to Clients</Button>
        </Jumbotron>
    </Container>
)
}

const mapStateToProps = (store) => ({
        client: store.clients.currentClient
    })
    
const mapDispatchProps = (dispatch) => bindActionCreators({ setCurrentClient }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(ClientDetails)