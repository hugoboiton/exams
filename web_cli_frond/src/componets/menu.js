import React, { Component } from 'react'
import { Button, 
    Container, 
    Row, 
    Col,
    Fade,
    Alert
} from 'reactstrap';
import axios from 'axios'
import Updoc from './up_document'
export class Menu extends Component {
    constructor(props){
        super(props)
        this.state=
        {
            isOpen:false,
            mensaje :'Seleccione el archivo  que desea subir ',
            uri: "https://localhost:5001/api/setDocument",
            flag:
            {
                messeg:'none ',
                status :false
            },
        }
        this.archivo=""
        this.codigo=""
        this.go_creat_docu=this.go_creat_docu.bind(this);
        this.go_list_docume=this.go_list_docume.bind(this);
        this.go_return=this.go_return.bind(this);
        this.hiceModal=this.hiceModal.bind(this);
        this.abrirArchivo=this.abrirArchivo.bind(this);
        this.cargarCodigo= this.cargarCodigo.bind(this);
        this.abrirclase= this.abrirclase.bind(this);
        this.EscrireditorClase=this.EscrireditorClase.bind(this);
    }
    render() 
    {
        const {flag}=this.state;
        return(
            <React.Fragment>  
            <Container>
                <Row>
                    
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                       <h1> Menu</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Button onClick={this.go_creat_docu} color="secondary" block>crear documento </Button>
                    </Col>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Button onClick={this.go_list_docume} color="secondary" block>listar documento</Button>
                    </Col>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                         <Button onClick={this.go_return} color="danger" block>salir </Button>
                    </Col>
                </Row>
                <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }} >
                                <Fade in={flag.status} tag="h5" className="mt-3">
                                        <Alert color="danger">
                                        <a href="#" className="alert-link">{flag.messeg}</a>.
                                    </Alert>
                                </Fade>
                                </Col>
                </Row>
                <Updoc isOpen={this.state.isOpen} toggle={this.hiceModal}
                     mensaje={this.state.mensaje} abrirArchivo={this.abrirArchivo}
                /> 
        
            </Container>
            </React.Fragment>  
        );
    }
    go_creat_docu()
    {   
        this.cargarCodigo();
      
    }
    go_return()
    {
        this.props.steps(1);
    }
    go_list_docume()
    {
        //this.cargar_docs();   
        this.props.steps(5);
    }
    cargarCodigo()
    {
        this.setState({
            isOpen:true,
        })
       
    }
    hiceModal()
    {
        this.setState({
            isOpen:false,
        })
        var user = this.props.session.user;
        var info=
            {
                "nombre":this.archivo,
                "conte":this.utf8_to_b64(this.codigo),
                "user": user,
            }
            console.log(info);
            this.consult_api(this.state.uri,info);
   
    }
    abrirArchivo()
    {
       document.getElementById('idarchivo').addEventListener('change',this.abrirclase,false);  
    }
    abrirclase(ev) 
    {
       
        const arch=new FileReader();
        arch.addEventListener('load',this.EscrireditorClase,false);
        arch.readAsBinaryString(ev.target.files[0]);
        this.archivo=ev.target.files[0].name
       
    }
    utf8_to_b64( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
      }
    async EscrireditorClase(ev)
    {
        this.codigo=ev.target.result;
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
}
export default Menu;