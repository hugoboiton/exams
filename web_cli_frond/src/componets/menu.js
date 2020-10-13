import React, { Component } from 'react'
import { Button, 
    Container, 
    Row, 
    Col,
} from 'reactstrap';

export class Menu extends Component {
    constructor(props){
        super(props)
        this.state=
        {
         
        }
        this.go_creat_docu=this.go_creat_docu.bind(this);
        this.go_list_docume=this.go_list_docume.bind(this);
        this.go_return=this.go_return.bind(this);
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
            </Container>
            </React.Fragment>  
        );
    }
    go_creat_docu()
    {   
        this.props.steps(4);
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
}
export default Menu;