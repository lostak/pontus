package cli

import (
	"strconv"

	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdCreatePoolPair() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pool-pair [alpha-denom] [alpha-amount] [beta-denom] [beta-amount] [share-amount] [swap-fee] [exit-fee]",
		Short: "Broadcast message create-pool-pair",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argAlphaDenom := args[0]
			argAlphaAmount := args[1]
			argBetaDenom := args[2]
			argBetaAmount := args[3]
			argShareAmount := args[4]
			argSwapFee := args[5]
			argExitFee := args[6]

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
