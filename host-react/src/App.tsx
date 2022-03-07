import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider} from "@chakra-ui/react";

import "./index.css";

import { load } from "growlers/store";
import Taps from "growlers/Taps";
import DataComponent from "growlers/DataComponent";
import Search from "growlers/Search";
import Cart from "growlers/Cart";

load("hv-taplist");

const App = () =>  (
 <ChakraProvider>
     <div style={{
         margin: "auto",
         maxWidth: "960px",
         display: "grid",
         gridTemplateColumns: "1fr 3fr",
         gridColumnGap: "1rem",
         }}>
        <div>
            <Search />
            <Cart />
            <DataComponent>
                {({ filteredTaps }) => filteredTaps.map(({ beverageName }) => (
                    <div key={beverageName}>{beverageName}</div>
                ))
                }
            </DataComponent>
        </div>

    <Taps />
    </div>
 </ChakraProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
