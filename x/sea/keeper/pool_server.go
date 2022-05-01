package keeper

import (
	"errors"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/VelaChain/pontus/x/sea/types"
)

func (k Keeper) CreatePoolPair(ctx sdk.Context, alphaDenom string, betaDenom string, msg *types.MsgCreatePoolPair) (*types.PoolPair,error) {
	if msg == nil {
		// TODO add to errors
		return nil, errors.New("MsgCreatePoolPair cannot be empty")
	}
	// get amounts w/ correct denoms
	var alphaAmount, betaAmount sdk.Int
	if msg.AlphaDenom != msg.BetaDenom {
		alphaAmount, betaAmount = msg.BetaAmount, msg.AlphaAmount
	} else {
		alphaAmount, betaAmount = msg.AlphaAmount, msg.BetaAmount
	} 
	// check amounts
	if !(alphaAmount.IsPositive() && betaAmount.IsPositive()) {
		// TODO add to errors
		return nil, errors.New("Pool asset amounts must be positive")
	}
	// check share amount
	if !msg.ShareAmount.IsPositive() {
		// TODO add to errors
		return nil, errors.New("Pool share amount must be positive")
	}	
	// check fees amounts
	if msg.SwapFee.IsNegative() || msg.ExitFee.IsNegative() {
		// TODO add to errors
		return nil, errors.New("Pool fees must be non-negative")
	}
	// get creator account address
	addr, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		// TODO add to errors
		return nil, err
	}
	// check creator has balances for coins
	alphaCoin := sdk.NewCoin(alphaDenom, alphaAmount)
	betaCoin := sdk.NewCoin(betaDenom, betaAmount)
	if !(k.bankKeeper.HasBalance(ctx, addr, alphaCoin) || k.bankKeeper.HasBalance(ctx, addr, betaCoin)) {
		// TODO add to errors
		return nil, errors.New("Creator does not have sufficient balances")
	}
	// create pool
	pool := types.NewPoolPair(alphaDenom, betaDenom, alphaAmount, betaAmount, msg.ShareAmount, msg.SwapFee, msg.ExitFee)
	// send coins from creator to pool
	err = k.bankKeeper.SendCoinsFromAccountToModule(ctx, addr, types.ModuleName, sdk.NewCoins(alphaCoin, betaCoin))
	if err != nil {
		return nil, err
	}
	// set pool in store
	k.SetPoolPair(ctx, pool)
	// return pool 
	return &pool, nil 
} 