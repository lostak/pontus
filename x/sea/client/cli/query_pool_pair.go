package cli

import (
	"context"

	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdListPoolPair() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-pool-pair",
		Short: "list all poolPair",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllPoolPairRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.PoolPairAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowPoolPair() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-pool-pair [alpha-denom] [beta-denom]",
		Short: "shows a poolPair",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argAlphaDenom := args[0]
			argBetaDenom := args[1]

			params := &types.QueryGetPoolPairRequest{
				AlphaDenom: argAlphaDenom,
				BetaDenom:  argBetaDenom,
			}

			res, err := queryClient.PoolPair(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
