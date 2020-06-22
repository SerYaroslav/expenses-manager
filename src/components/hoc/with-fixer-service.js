import React from "react";
import { ServiceConsumer } from "../service-context";

const withFixerService = () => (Wrapped) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {(fixerService) => {
          return <Wrapped {...props} fixerService={fixerService} />;
        }}
      </ServiceConsumer>
    );
  };
};

export default withFixerService;
