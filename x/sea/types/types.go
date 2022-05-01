package types

import(
	
	sdk "github.com/cosmos/cosmos-sdk/types"

)

func NewLiqProv( 
	poolName string,
	address string,
	shareAmount sdk.Int,
) Provider {
	provider := Provider{
		PoolName:		poolName,
		Address:		address,
		ShareAmount:	shareAmount,
	}

	return provider
}

func NewPoolPair(
	alphaDenom string, 
	betaDenom string, 
	alphaAmount sdk.Int,
	betaAmount sdk.Int,
	shareAmount sdk.Int,
	swapFee sdk.Dec,
	exitFee sdk.Dec,
) PoolPair {
	pool := PoolPair{
		AlphaDenom:		alphaDenom,
		BetaDenom:		betaDenom,
		AlphaAmount:	alphaAmount,
		BetaAmount:		betaAmount,
		ShareAmount:	shareAmount,
		SwapFee:		swapFee,
		ExitFee:		exitFee,
	}
	return pool
}