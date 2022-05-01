package sea_test

import (
	"testing"

	keepertest "github.com/VelaChain/pontus/testutil/keeper"
	"github.com/VelaChain/pontus/testutil/nullify"
	"github.com/VelaChain/pontus/x/sea"
	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),
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
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.SeaKeeper(t)
	sea.InitGenesis(ctx, *k, genesisState)
	got := sea.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.PortId, got.PortId)

	require.ElementsMatch(t, genesisState.ProviderList, got.ProviderList)
	require.ElementsMatch(t, genesisState.PoolPairList, got.PoolPairList)
	// this line is used by starport scaffolding # genesis/test/assert
}
