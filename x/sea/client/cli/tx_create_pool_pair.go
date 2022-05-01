package cli

import (
	"strconv"
	"errors"

	//"github.com/spf13/cast"
	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var _ = strconv.Itoa(0)

func CmdCreatePoolPair() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pool-pair [alpha-denom] [alpha-amount] [beta-denom] [beta-amount] [share-amount] [swap-fee] [exit-fee]",
		Short: "Broadcast message create-pool-pair",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argAlphaDenom := args[0]
			
			// Make alpha amount sdk.Int
			argAlphaAmount, ok := sdk.NewIntFromString(args[1])
			if !ok {
				// TODO add to errors
				return errors.New("invalid alpha amount input")
			}

			argBetaDenom := args[2]
			
			// Make beta amount sdk.Int
			argBetaAmount, ok := sdk.NewIntFromString(args[3])
			if !ok {
				// TODO add to errors
				return errors.New("invalid beta amount input")
			}
			
			// Make share amount sdk.Int
			argShareAmount, ok := sdk.NewIntFromString(args[4])
			if !ok {
				// TODO add to errors
				return errors.New("invalid share amount input")
			}

			// Make swapFee amount sdk.Dec
			argSwapFee, err := sdk.NewDecFromStr(args[5])
			if err != nil {
				return err
			}

			// Make exitFee amount sdk.Dec
			argExitFee, err := sdk.NewDecFromStr(args[6])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreatePoolPair(
				clientCtx.GetFromAddress().String(),
				argAlphaDenom,
				argAlphaAmount,
				argBetaDenom,
				argBetaAmount,
				argShareAmount,
				argSwapFee,
				argExitFee,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
