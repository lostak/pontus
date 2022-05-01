package types_test

import (
	"testing"

	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{
				PortId: types.PortID,
				ProviderList: []types.Provider{
					{
						PoolName: "0",
						Address:  "0",
					},
					{
						PoolName: "1",
						Address:  "1",
					},
				},
				PoolPairList: []types.PoolPair{
					{
						AlphaDenom: "0",
						BetaDenom:  "0",
					},
					{
						AlphaDenom: "1",
						BetaDenom:  "1",
					},
				},
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},
		{
			desc: "duplicated provider",
			genState: &types.GenesisState{
				ProviderList: []types.Provider{
					{
						PoolName: "0",
						Address:  "0",
					},
					{
						PoolName: "0",
						Address:  "0",
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated poolPair",
			genState: &types.GenesisState{
				PoolPairList: []types.PoolPair{
					{
						AlphaDenom: "0",
						BetaDenom:  "0",
					},
					{
						AlphaDenom: "0",
						BetaDenom:  "0",
					},
				},
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
