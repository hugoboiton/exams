import React, { Component } from 'react'
import { Button, 
    Container, 
    Row, 
    Col,
    Form,  
    Alert,
    Fade,
    ListGroup, ListGroupItem 
} from 'reactstrap';
import axios from 'axios'
import Doct from './doc'
export class ListDoct extends Component {
   
    constructor(props){
        super(props)
        this.state=
        {
            flag:
            {
                messeg:'none ',
                status :false
            },
            list:[],
            uri: "https://localhost:5001/api/getDocument",
        }
        this.exit=this.exit.bind(this);
        this.return_pages=this.return_pages.bind(this);
        this.cargar_docs();
    }
    exit()
    {
        this.props.steps(1);
    }
    return_pages()
    {
        this.props.steps(3);
    }
    cargar_docs()
    {
        var info=
        {
            "user":this.props.session.user
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
               
                const list=[];
                resul.forEach(element => {
                    const docu=
                    {
                        "nombre":element[1],
                        "cont":element[2]
                    }
                    list.push(docu)
                });
               this.setState({
                   list:list
               })
            }
            else
            {
                const {flag} =this.state;
                flag.messeg="error de credenciales, no hay archivos";
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
    listar (lista)
    {
        //{"nombre: "+t.nombre +" usuario: "+ this.props.session.user}
        return lista.map((t) => {
            return (
                      <ListGroupItem tag="button" action>
                           <Doct
                              name={t.nombre}
                              user={this.props.session.user}  
                              conte={t.cont}
                           />
                      </ListGroupItem>          
            );
            })
    }
    render() 
    {
        const {flag}=this.state;   
        const {list}=this.state; 
        return(
            <React.Fragment>  
            <Container>
                <Row>
                    
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <h1>Documentos</h1>
                    </Col>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <ListGroup>
                            <ListGroupItem active tag="a" href="#" action>list documnes </ListGroupItem>
                            {this.listar(list)}
                        </ListGroup>
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
                        <Button  onClick={this.return_pages} color="success"block>regresar</Button>
                    </Col>
                    <Col xs="6" >
                        <Button onClick={this.exit} color="danger" block>Salir </Button>
                    </Col>
                </Row>    
            </Container>
            </React.Fragment>
        );
    }

}
export default ListDoct;