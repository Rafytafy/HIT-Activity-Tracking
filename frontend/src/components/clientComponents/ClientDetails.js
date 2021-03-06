import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Container, Jumbotron, Button, ListGroup, ListGroupItem, Col} from 'reactstrap'
import {connect} from 'react-redux'
import  { bindActionCreators } from 'redux';
import {setCurrentClient} from '../../redux/actions/index'
import {useHistory, useParams} from 'react-router-dom';
import DefaultPicture from '../../images/default-profile-picture.png'
import Chart from "react-google-charts";
import firebase from 'firebase';

function ClientDetails(props) {
    const history = useHistory();
    let { id } = useParams();
    const [picture, setPicture] = useState("");

    
    useEffect(() => {
        if(props.client.name.firstName === ""){
            axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((res) => {
                props.setCurrentClient(res.data)
            
            })
        }
        axios.get(`http://localhost:5000/subscriber/${id}`)
            .then((res) => {
                props.setCurrentClient(res.data)
                firebase.storage().ref(res.data.profilePicURL).getDownloadURL().then((url) => {
                    setPicture(url);
                })
            })

        if (!picture) { setPicture(DefaultPicture) }
        
      }, []);
      
      //convert birthday to age
      var today = new Date();
      var cDay = today.getDate();
      var cMonth = today.getMonth();
      var cYear = today.getFullYear();
      var todayDate = new Date(cYear, cMonth, cDay);
      var birth = new Date(props.client.birthdate);
      var diff = Math.abs(todayDate - birth);
      const age = Math.floor(diff / 31536000000);
      const setAge = (age);

      //pop most recent weight
      var weight_array= (props.client.weights)
      
    

    const renderGraphData = () => {
        let data = [["time", "value"]]
        if (props.client.workoutSessions.length>0){  for(let i = 0; i < props.client.workoutSessions[props.client.workoutSessions.length - 1].heartrate.length; i++){
            data = [...data, [props.client.workoutSessions[props.client.workoutSessions.length - 1].heartrate[i].time, props.client.workoutSessions[props.client.workoutSessions.length - 1].heartrate[i].value]]
            
        }
    }
        
        return data
    }
    return ( 

    <Container className="container-fluid">
        <Jumbotron className="mt-3">
            
            <div className="d-flex">
                <Col xs={6}>
                <img src={picture} style={{width: '10em'}}/>
                <div>
                    <h1 className="display-4">{props.client.name.firstName} {props.client.name.lastName}</h1>
                </div>
                </Col>
                <Col>
                <div className="floatRight">
                    { props.client.weights ?
                        ( 
                            <>
                                <h6>Age: {age}</h6>
                                <h6>Initial Weight: {props.client.initWeight}</h6>
                                <h6>Current Weight: {weight_array[weight_array.length - 1].weight}</h6>
                                <h6>Height: {props.client.height.feet}' {props.client.height.inches}"</h6>
                                <h4 className="client-bottom-align">{props.client.email}</h4>
                            </>
                        )
                        :
                        (<></>)
                    }       
                </div>
                </Col>
            </div>
            <hr className="my-2" />
            <div className="clearfix">
                <h3>Recent Activity</h3>
                    {props.client.workoutSessions.length>0 ? //Check if workoutSessions exist for user
                        (   <>
                            <div style={{ display: 'flex', maxWidth: 1000 }}>
                                <Chart
                                    width={1000}
                                    height={300}
                                    chartType="LineChart"
                                    loader={<div>Loading Chart</div>}
                                    data={renderGraphData()}
                                    options={{
                                    title: `Routine: ${props.client.workoutSessions[props.client.workoutSessions.length - 1].routine.name}\n Date: ${props.client.workoutSessions[props.client.workoutSessions.length - 1].date.slice(0, 10)}`,
                                    chartArea: { width: '90%' },
                                    hAxis: {
                                        title: 'Time',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Heart Rate',
                                    },
                                    }}
                                    legendToggle
                                />
                                
                                </div>
                                <Button className="float-right mt-3" onClick={() => history.push(`/workoutSession/${props.client._id}`)}>View History</Button>
                                </>
                                )
                        :
                        (
                            <h3 className="d-flex justify-content-center">
                            No recent activity
                            </h3>
                        )
                    }     
            </div>
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