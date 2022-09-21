import "bootstrap/dist/css/bootstrap.min.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

//Componentes
import Velocidad from "./Velocidad";
import Fuerza from "./Fuerza";
import Ritmo from "./Ritmo";
import InfoUsuario from "./InfoUsuario";

export default function MenuEntreno() {
    const estilo = {
        "border" : "none",
        "color" : "white"
    };
    return (
        <div >
            <Tabs
                defaultActiveKey="fuerza"
                id=""
                className="mb-3 border-light rounded d-flex justify-content-center align-items-center"
                justify
                style={estilo}>
                    
                <Tab eventKey="fuerza" title="Fuerza">
                    <Fuerza />
                </Tab>
                <Tab eventKey="velocidad" title="Velocidad">
                    <Velocidad />
                </Tab>
                <Tab eventKey="ritmo" title="Ritmo">
                    <Ritmo />
                </Tab>
                <Tab eventKey="infou" title="Perfil">
                    <InfoUsuario />
                </Tab>
            </Tabs>
        </div>
    );
}
