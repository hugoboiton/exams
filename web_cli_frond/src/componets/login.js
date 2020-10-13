import React, { Component } from 'react'
import { Button, 
    Container, 
    Row, 
    Col,
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Alert,
    Fade
} from 'reactstrap';
import axios from 'axios'
export class Login extends Component {
    constructor(props){
        super(props)
        this.state=
        {
            flag:
            {
                messeg:'none ',
                status :false
            },
            uri: "https://localhost:5001/api/getUser"
        }
        this.create_user=this.create_user.bind(this);
        this.get_user=this.get_user.bind(this);
    }
    render() 
    {
        const {flag}=this.state;
        return(
            <React.Fragment>  
            <Container>
                <Row>
                    
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                       <h1> login</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form  onSubmit={this.get_user}>
                            <FormGroup>
                                <Label for="user">User</Label>
                                <Input type="txt" name="user" id="user" placeholder="insert user " />                               
                            </FormGroup>
                            <FormGroup>
                                <Label for="pass">Password</Label>
                                <Input type="password" name="pass" id="pass" placeholder="insert password" />
                            </FormGroup>
                            <FormGroup  row>
                                <Col xs="6" >
                                    <Button color="success"block>ingresar </Button>
                                </Col>
                                <Col xs="6" >
                                    <Button onClick={this.create_user} color="danger" block>registrar </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup  row>
                                <Col sm="12" md={{ size: 6, offset: 3 }} >
                                <Fade in={flag.status} tag="h5" className="mt-3">
                                        <Alert color="danger">
                                        <a href="#" className="alert-link">{flag.messeg}</a>.
                                    </Alert>
                                </Fade>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </React.Fragment>  
        );
    }
    
    get_user(e)
    {
        e.preventDefault();
        var user = e.target.user.value;
        var pass = e.target.pass.value;
        
        if (user !== '' && pass !== '')
        {
            var info=
            {
                "user": user,
                "pass":pass
            }
            this.consult_api(this.state.uri,info);
        }
        else 
        {
            const {flag} =this.state;
            flag.messeg="por favor ingresar usuario y password"
            flag.status=true;
            this.setState({
                flag:flag
            })
        }
    }
    async  consult_api(uri,info)
    {
        var resul={
            estado:"error",
        }        
        console.log(uri,info);
        try
        {
            await  axios.post(uri,info)
           .then(function(response){
               console.log("todo correcto")
               resul=response.data
               return response.data;        
           })
           .catch(function(error){
               console.log("error no encuentra el uri")
               console.log(error)
               resul.estado="error"
               resul.mensaje="no_responde_api"

           })
           .then(function(){
               console.log("siempre ejecutando")
               
           });
        }
        catch(error)
        {
            console.log(error)
        }
        console.log(resul)
        if(Array.isArray(resul))
        {
            if (resul[1]!=='error')
            {
                this.props.session.user=resul[1];
                this.props.steps(3);
            }
            else
            {
                const {flag} =this.state;
                flag.messeg="error de credenciales, user o password incorectos";
                flag.status=true;
                this.setState({
                flag:flag
                })
            }
        }
        else
        {
            const {flag} =this.state;
            flag.messeg="error de conecion"
            flag.status=true;
            this.setState({
                flag:flag
            })
        }
       
    }

    create_user(e)
    {
        
        e.preventDefault();
        this.props.steps(2);
    }
}
export default Login;