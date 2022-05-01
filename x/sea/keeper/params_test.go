package keeper_test

import (
	"testing"

	testkeeper "github.com/VelaChain/pontus/testutil/keeper"
	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.SeaKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
