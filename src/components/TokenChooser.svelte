<script lang="ts">
    import type { Token } from "../models/Token";
    import Select from "svelte-select";
    import type { TokenCount } from "../models/TokenCount";

    export let description: string;
    export let tokens: Token[];
    export let tokenCount: TokenCount;
    export let onTokenChanged: undefined | (() => void);
    export let onAmountChanged: undefined | (() => void) = () => {};
</script>

<div class="card">
    <h5 class="card-title">
        {description}
    </h5>
    <div class="selectcontainer">
        <div class="newselect">
            <Select
                containerClasses={"newselect"}
                bind:value={tokenCount.Token}
                isMulti={false}
                items={tokens}
                labelIdentifier={"symbol"}
                optionIdentifier={"address"}
                placeholder={"select a token"}
                on:select={(e) => {
                    if (onTokenChanged) {
                        onTokenChanged();
                    }
                }}
            />
        </div>
        <input
            bind:value={tokenCount.Count}
            on:input={(e) => {
                if (onAmountChanged) {
                    onAmountChanged();
                }
            }}
            min="0"
            disabled={tokenCount.Token === undefined}
            placeholder={tokenCount.Token === undefined
                ? "select a token"
                : "enter an amount"}
        />
    </div>
</div>

<style>
    .selectcontainer {
        display: flex;
    }
    input {
        flex-grow: 1;
    }
    .newselect {
        flex-grow: 2;
        padding-right: 5px;
    }
</style>
