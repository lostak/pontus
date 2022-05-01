package keeper

import (
	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// SetPoolPair set a specific poolPair in the store from its index
func (k Keeper) SetPoolPair(ctx sdk.Context, poolPair types.PoolPair) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PoolPairKeyPrefix))
	b := k.cdc.MustMarshal(&poolPair)
	store.Set(types.PoolPairKey(
		poolPair.AlphaDenom,
		poolPair.BetaDenom,
	), b)
}

// GetPoolPair returns a poolPair from its index
func (k Keeper) GetPoolPair(
	ctx sdk.Context,
	alphaDenom string,
	betaDenom string,

) (val types.PoolPair, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PoolPairKeyPrefix))

	b := store.Get(types.PoolPairKey(
		alphaDenom,
		betaDenom,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemovePoolPair removes a poolPair from the store
func (k Keeper) RemovePoolPair(
	ctx sdk.Context,
	alphaDenom string,
	betaDenom string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PoolPairKeyPrefix))
	store.Delete(types.PoolPairKey(
		alphaDenom,
		betaDenom,
	))
}

// GetAllPoolPair returns all poolPair
func (k Keeper) GetAllPoolPair(ctx sdk.Context) (list []types.PoolPair) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.PoolPairKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.PoolPair
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
