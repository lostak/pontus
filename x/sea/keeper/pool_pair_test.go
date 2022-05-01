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

func createNPoolPair(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.PoolPair {
	items := make([]types.PoolPair, n)
	for i := range items {
		items[i].AlphaDenom = strconv.Itoa(i)
		items[i].BetaDenom = strconv.Itoa(i)

		keeper.SetPoolPair(ctx, items[i])
	}
	return items
}

func TestPoolPairGet(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	items := createNPoolPair(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetPoolPair(ctx,
			item.AlphaDenom,
			item.BetaDenom,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestPoolPairRemove(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	items := createNPoolPair(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemovePoolPair(ctx,
			item.AlphaDenom,
			item.BetaDenom,
		)
		_, found := keeper.GetPoolPair(ctx,
			item.AlphaDenom,
			item.BetaDenom,
		)
		require.False(t, found)
	}
}

func TestPoolPairGetAll(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	items := createNPoolPair(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllPoolPair(ctx)),
	)
}
