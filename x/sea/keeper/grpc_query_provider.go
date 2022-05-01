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

func (k Keeper) ProviderAll(c context.Context, req *types.QueryAllProviderRequest) (*types.QueryAllProviderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var providers []types.Provider
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	providerStore := prefix.NewStore(store, types.KeyPrefix(types.ProviderKeyPrefix))

	pageRes, err := query.Paginate(providerStore, req.Pagination, func(key []byte, value []byte) error {
		var provider types.Provider
		if err := k.cdc.Unmarshal(value, &provider); err != nil {
			return err
		}

		providers = append(providers, provider)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllProviderResponse{Provider: providers, Pagination: pageRes}, nil
}

func (k Keeper) Provider(c context.Context, req *types.QueryGetProviderRequest) (*types.QueryGetProviderResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetProvider(
		ctx,
		req.PoolName,
		req.Address,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetProviderResponse{Provider: val}, nil
}
