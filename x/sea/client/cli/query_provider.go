package cli

import (
	"context"

	"github.com/VelaChain/pontus/x/sea/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
)

func CmdListProvider() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-provider",
		Short: "list all provider",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllProviderRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.ProviderAll(context.Background(), params)
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

func CmdShowProvider() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-provider [pool-name] [address]",
		Short: "shows a provider",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argPoolName := args[0]
			argAddress := args[1]

			params := &types.QueryGetProviderRequest{
				PoolName: argPoolName,
				Address:  argAddress,
			}

			res, err := queryClient.Provider(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
