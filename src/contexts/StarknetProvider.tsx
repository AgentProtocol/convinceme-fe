import React from "react";
import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector, isInArgentMobileAppBrowser } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { sepolia } from "@starknet-react/chains";

export default function StarknetProvider({ children }: { children: React.ReactNode }) {
  const chains = [sepolia];

  const connectors = isInArgentMobileAppBrowser() ? [
    ArgentMobileConnector.init({
      options: {
        dappName: "ConvinceMe",
        projectId: "example-project-id",
        url: "https://example.com",
      },
      inAppBrowserOptions: {},
    })
  ] : [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" }}),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" }}),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    ArgentMobileConnector.init({
      options: {
        dappName: "ConvinceMe",
        projectId: "example-project-id",
        url: "https://example.com",
      }
    })
  ];

  return(
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}