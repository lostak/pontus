package types

import (
	"fmt"
	host "github.com/cosmos/ibc-go/v2/modules/core/24-host"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		PortId:       PortID,
		ProviderList: []Provider{},
		PoolPairList: []PoolPair{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	if err := host.PortIdentifierValidator(gs.PortId); err != nil {
		return err
	}
	// Check for duplicated index in provider
	providerIndexMap := make(map[string]struct{})

	for _, elem := range gs.ProviderList {
		index := string(ProviderKey(elem.PoolName, elem.Address))
		if _, ok := providerIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for provider")
		}
		providerIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in poolPair
	poolPairIndexMap := make(map[string]struct{})

	for _, elem := range gs.PoolPairList {
		index := string(PoolPairKey(elem.AlphaDenom, elem.BetaDenom))
		if _, ok := poolPairIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for poolPair")
		}
		poolPairIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
