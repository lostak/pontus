package keeper

import (
	"context"

	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) PoolPairAll(c context.Context, req *types.QueryAllPoolPairRequest) (*types.QueryAllPoolPairResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var poolPairs []types.PoolPair
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	poolPairStore := prefix.NewStore(store, types.KeyPrefix(types.PoolPairKeyPrefix))

	pageRes, err := query.Paginate(poolPairStore, req.Pagination, func(key []byte, value []byte) error {
		var poolPair types.PoolPair
		if err := k.cdc.Unmarshal(value, &poolPair); err != nil {
			return err
		}

		poolPairs = append(poolPairs, poolPair)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllPoolPairResponse{PoolPair: poolPairs, Pagination: pageRes}, nil
}

func (k Keeper) PoolPair(c context.Context, req *types.QueryGetPoolPairRequest) (*types.QueryGetPoolPairResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetPoolPair(
		ctx,
		req.AlphaDenom,
		req.BetaDenom,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetPoolPairResponse{PoolPair: val}, nil
}
