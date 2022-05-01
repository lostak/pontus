package keeper

import (
//	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/VelaChain/pontus/x/sea/types"
)

func (k Keeper) CreateLiqProv(ctx sdk.Context, poolName string, address string, shareAmount sdk.Int) (types.Provider, error) {
	lp := types.NewLiqProv(poolName, address, shareAmount)
	k.SetProvider(ctx, lp)

	return lp, nil
}