package keeper_test

import (
	"strconv"
	"testing"

	keepertest "github.com/VelaChain/pontus/testutil/keeper"
	"github.com/VelaChain/pontus/testutil/nullify"
	"github.com/VelaChain/pontus/x/sea/keeper"
	"github.com/VelaChain/pontus/x/sea/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNProvider(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Provider {
	items := make([]types.Provider, n)
	for i := range items {
		items[i].PoolName = strconv.Itoa(i)
		items[i].Address = strconv.Itoa(i)

		keeper.SetProvider(ctx, items[i])
	}
	return items
}

func TestProviderGet(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	items := createNProvider(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetProvider(ctx,
			item.PoolName,
			item.Address,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestProviderRemove(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	items := createNProvider(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveProvider(ctx,
			item.PoolName,
			item.Address,
		)
		_, found := keeper.GetProvider(ctx,
			item.PoolName,
			item.Address,
		)
		require.False(t, found)
	}
}

func TestProviderGetAll(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	items := createNProvider(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllProvider(ctx)),
	)
}
