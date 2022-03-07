import React from "react";
import { Box } from "@chakra-ui/react";
import { useProxy } from "valtio";

import BeverageCard from "./BeverageCard";
import store from "../store";
import { MFE_BORDER } from "../constants";

const Taps = () => {
  const { filteredTaps } = useProxy(store);
  console.log("Taps", filteredTaps);
  return (
    <Box border={MFE_BORDER}>
      {filteredTaps.map((beverage) => (
        <BeverageCard
          key={[beverage.producerName, beverage.beverageName].join("")}
          beverage={beverage}
        />
      ))}
    </Box>
  );
};

export default Taps;
