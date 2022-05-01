package keeper

import (
	"context"

	"github.com/VelaChain/pontus/x/sea/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreatePoolPair(goCtx context.Context, msg *types.MsgCreatePoolPair) (*types.MsgCreatePoolPairResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgCreatePoolPairResponse{}, nil
}
