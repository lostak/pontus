package keeper_test

import (
	"context"
	"testing"

	keepertest "github.com/VelaChain/pontus/testutil/keeper"
	"github.com/VelaChain/pontus/x/sea/keeper"
	"github.com/VelaChain/pontus/x/sea/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.SeaKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
