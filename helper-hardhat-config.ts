export interface networkConfigItem {
    name?: string;
    blockConfirmations?: number;
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem;
}

export const developmentChains = ["hardhat", "localhost"];
export const INITIAL_SUPPLY = "1000000000000000000000";

export const networkConfig: networkConfigInfo = {
    5: {
        name: "goerli",
        blockConfirmations: 6,
    },
    31337: {
        name: "hardhat",
        blockConfirmations: 1,
    },
};
