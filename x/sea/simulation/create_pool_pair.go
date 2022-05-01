package simulation

import (
	"math/rand"

	"github.com/VelaChain/pontus/x/sea/keeper"
	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgCreatePoolPair(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgCreatePoolPair{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the CreatePoolPair simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "CreatePoolPair simulation not implemented"), nil, nil
	}
}
