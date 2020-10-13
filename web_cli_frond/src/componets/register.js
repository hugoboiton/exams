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
export class Register extends Component {
    constructor(props)
    {
        super(props)
        this.state=
        {
            flag:
            {
                messeg:'none ',
                status :false
            },
            uri: "https://localhost:5001/api/setUser"
        }
        this.create_user=this.create_user.bind(this);
        this.return_pages=this.return_pages.bind(this);
    }
    render() 
    {
        const {flag}=this.state;
        return(
            <React.Fragment>  
            <Container>
                <Row>
                    
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                       <h1> Registro de usuario</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form  onSubmit={this.create_user}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="txt" name="name" id="name" placeholder="insert name " />
                            </FormGroup>
                            <FormGroup>
                                <Label for="last_name">Last Name</Label>
                                <Input type="txt" name="last_name" id="last_name" placeholder="insert last name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="user">User</Label>
                                <Input type="txt" name="user" id="user" placeholder="insert user name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="pass">Password</Label>
                                <Input type="password" name="pass" id="pass" placeholder="insert password " />
                            </FormGroup>
                            <FormGroup  row>
                                <Col xs="6" >
                                    <Button color="success"block> crear usuario </Button>
                                </Col>
                                <Col xs="6" >
                                    <Button onClick={this.return_pages} color="danger" block>regresar </Button>
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
    create_user(e)
    {
        e.preventDefault();
        var name =e.target.name.value;
        var last_name=e.target.last_name.value;
        var user = e.target.user.value;
        var pass = e.target.pass.value;
        e.target.name.value='';
        e.target.last_name.value='';
        e.target.user.value='';
        e.target.pass.value='';
        if (user !== '' && pass !== '' && name !== '' && last_name !== '' )
        {
            var info=
            {
                "nombre":name,
                "apellido":last_name,
                "user": user,
                "pass":pass
            }
            console.log(info);
            this.consult_api(this.state.uri,info);
        }
        else 
        {
            const {flag} =this.state;
            flag.messeg="por favor de llenar todos los campos"
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
        if(Array.isArray(resul))
        {
            if (resul[1]!=='error')
            {
                const {flag} =this.state;
                flag.messeg="usuario creado exitosamenste"
                flag.status=true;
                this.setState({
                flag:flag
                })
            }
            else
            {
                const {flag} =this.state;
                flag.messeg="error, el usuario ya existe."
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

    return_pages()
    {
        this.props.steps(1);
    }
}
export default  Register;