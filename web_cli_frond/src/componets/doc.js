import React, { Component } from 'react'
import { Button, 
    Container, 
    Row, 
    Col,
    Form,  
    Alert,
    Fade,
    Badge 
} from 'reactstrap';
import axios from 'axios'
export class Doct extends Component {
   
    constructor(props){
        super(props)
        this.state=
        {
            flag:
            {
                messeg:'none ',
                status :false
            },
            uri: "https://localhost:5001/api/deltDocument"
        }
        this.delec_doc=this.delec_doc.bind(this);
        this.ver=this.ver.bind(this);
    }
    delec_doc()
    {
        var nombre=this.props.name;
        var user =this.props.user;
        var info =
        {
           "nombre":nombre,
           "user":user
        }
        this.consult_api(this.state.uri,info);
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
                flag.messeg="se elimino correctamente,el archivo";
                flag.status=true;
                this.setState({
                flag:flag
                })
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


    ver()
    {
        const {flag}=this.state;
        flag.status=!flag.status;
        flag.messeg= this.props.conte;
        this.setState({
            flag:flag
        })
    }
    render() 
    {
        var nombre=this.props.name;
        var user =this.props.user;
        const {flag}=this.state;
        return(
            <React.Fragment>  
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Badge color="info">Documento</Badge>
                    </Col>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        Nombre : {nombre}
                    </Col>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        Autor: {user}
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                                <Fade in={flag.status} tag="h5" className="mt-3">
                                        <Alert color="info">
                                             <a href="#" className="alert-link">{flag.messeg}</a>.
                                        </Alert>
                                </Fade>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" >
                        <Button  onClick={this.ver} color="success"block>ver contenido</Button>
                    </Col>
                    <Col xs="6" >
                        <Button onClick={this.delec_doc} color="danger" block>eliminar </Button>
                    </Col>
                </Row>    
            </Container>
            </React.Fragment>
        );
    }

}
export default Doct;