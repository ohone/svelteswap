<script lang="ts">
    import SwapContainer from "./SwapContainer.svelte";
    import { ethers } from "ethers";
    import TokenListSelect from "./TokenListSelect.svelte";
    import type { Token } from "../models/Token";
    import TopBar from "./TopBar.svelte";
    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
        "any"
    );
    let signer = null;
    let address: string | undefined;
    async function ConnectWallet() {
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        address = await signer.getAddress();
    }

    const ConnectWalletPromise = ConnectWallet();

    let tokens: Token[] = [];
</script>

<TopBar {address} />
<main>
    {#await ConnectWalletPromise}
        <p>Connect web3 provider.</p>
    {:then}
        <SwapContainer bind:tokens />
        <TokenListSelect bind:tokens />
    {/await}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
