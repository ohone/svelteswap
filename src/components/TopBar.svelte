<script lang="ts">
    import { Navbar } from "sveltestrap";
    export let address: string | undefined = undefined;
</script>

<Navbar color="dark">
    <h1>svelteswap!</h1>
    <p class="address">{address}</p>
</Navbar>

<style>
    h1 {
        color: #ffffff;
    }
    .address {
        top: 50%;
        color: #ffffff;
        margin-bottom: 0;
    }
</style>
