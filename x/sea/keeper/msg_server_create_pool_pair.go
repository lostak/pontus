package keeper

import (
	"context"
	"errors"

	"github.com/VelaChain/pontus/x/sea/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) CreatePoolPair(goCtx context.Context, msg *types.MsgCreatePoolPair) (*types.MsgCreatePoolPairResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	// get pool name from msg
	// put denoms in alpha order
	var alphaDenom, betaDenom string

	if msg.AlphaDenom > msg.BetaDenom {
		alphaDenom, betaDenom = msg.BetaDenom, msg.AlphaDenom
	} else {
		alphaDenom, betaDenom = msg.AlphaDenom, msg.BetaDenom
	}
	// check if pool alrady exists using denoms
	if _, found := k.Keeper.GetPoolPair(ctx, alphaDenom, betaDenom); found {
		// TODO add to errors
		return &types.MsgCreatePoolPairResponse{}, errors.New("Pool already exists")
	}
	// create pool and add to store
	pool, err := k.Keeper.CreatePoolPair(ctx, alphaDenom, betaDenom, msg)
	if err != nil {
		return &types.MsgCreatePoolPairResponse{}, err
	}
	// create provider and add to store
	poolName := types.PoolPairName(alphaDenom, betaDenom)
	_, err = k.Keeper.CreateLiqProv(ctx, poolName, msg.Creator, pool.ShareAmount)
	if err != nil {
		return &types.MsgCreatePoolPairResponse{}, err
	}

	return &types.MsgCreatePoolPairResponse{}, nil
}
