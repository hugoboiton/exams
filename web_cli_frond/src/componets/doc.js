import React, { Component } from 'react'
import { Button, 
    Container, 
    Row, 
    Col,
    Form,  
    Alert,
    Fade,
    Badge, 
    Collapse
} from 'reactstrap';
import axios from 'axios'
import logo from './logo2.png';
import { saveAs } from 'file-saver';
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
 
    
    b64toFile(b64Data, filename, contentType) {
        var sliceSize = 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
    
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
    
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var file = new File(byteArrays, filename, {type: contentType});
        return file;
    }

    ver()
    {
        var nombre=this.props.name;
        nombre=nombre.split(".");  
        var vec=this.props.conte;
        console.log(vec);
        console.log(this.getTipo(nombre[1]))
        vec=this.b64toFile(vec,this.props.name,nombre[1])
        var FileSaver = require('file-saver');
        var blob = new Blob([vec],{type:"octet/stream"})
        FileSaver.saveAs(blob,this.props.name);
    }

    getTipo(tipo)
    {
        if(tipo==='png'||tipo==='jpg')
        {
            return "image/"+tipo
        }
        else if (tipo ==='txt')
        {
            return "text/plain;charset=utf-8"
        }
        else
        {
           return "octet/stream"
        }
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
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                             <img src={logo}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" >
                        <Button  onClick={this.ver} color="success"block>descargar</Button>
                    </Col>
                    <Col xs="6" >
                        <Button onClick={this.delec_doc} color="danger" block>eliminar </Button>
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
            </Container>
            </React.Fragment>
        );
    }

}
export default Doct;