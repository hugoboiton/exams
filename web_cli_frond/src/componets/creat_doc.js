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
export class CreatDoc extends Component {
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
            uri: "https://localhost:5001/api/setDocument"
        }
        this.create_doc=this.create_doc.bind(this);
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
                       <h1> Registro de documeto</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form  onSubmit={this.create_doc}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="txt" name="name" id="name" placeholder="insert name " />
                            </FormGroup>
                            <FormGroup>
                                <Label for="conte">Content</Label>
                                <Input type="textarea" name="cont" id="cont" placeholder="insert content " />
                            </FormGroup>
                            <FormGroup  row>
                                <Col xs="6" >
                                    <Button color="success"block> crear </Button>
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
    create_doc(e)
    {
        e.preventDefault();
        var name =e.target.name.value;
        var doc=e.target.cont.value;
        var user = this.props.session.user;
        
        e.target.name.value='';
        e.target.cont.value='';
        if (name !== '' && doc !== '' )
        {
          
            var info=
            {
                "nombre":name,
                "conte":doc,
                "user": user,
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
                flag.messeg="documento creado exitosamenste"
                flag.status=true;
                this.setState({
                flag:flag
                })
            }
            else
            {
                const {flag} =this.state;
                flag.messeg="error, el documeto ya existe."
                flag.status=true;
                this.setState({
                flag:flag
                })
            }
        }
        else
        {
            const {flag} =this.state;
            flag.messeg="error de coneccion"
            flag.status=true;
            this.setState({
                flag:flag
            })
        }
       
    }

    return_pages()
    {
        this.props.steps(3);
    }
}
export default  CreatDoc;