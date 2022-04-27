// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IPoolAddressesProvider {
    function getPool() external view returns (address);
}
