package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/VelaChain/pontus/testutil/keeper"
	"github.com/VelaChain/pontus/testutil/nullify"
	"github.com/VelaChain/pontus/x/sea/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestProviderQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNProvider(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetProviderRequest
		response *types.QueryGetProviderResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetProviderRequest{
				PoolName: msgs[0].PoolName,
				Address:  msgs[0].Address,
			},
			response: &types.QueryGetProviderResponse{Provider: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetProviderRequest{
				PoolName: msgs[1].PoolName,
				Address:  msgs[1].Address,
			},
			response: &types.QueryGetProviderResponse{Provider: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetProviderRequest{
				PoolName: strconv.Itoa(100000),
				Address:  strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.Provider(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestProviderQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNProvider(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllProviderRequest {
		return &types.QueryAllProviderRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.ProviderAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Provider), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Provider),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.ProviderAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Provider), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.Provider),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.ProviderAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.Provider),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.ProviderAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
