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

func TestPoolPairQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNPoolPair(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetPoolPairRequest
		response *types.QueryGetPoolPairResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetPoolPairRequest{
				AlphaDenom: msgs[0].AlphaDenom,
				BetaDenom:  msgs[0].BetaDenom,
			},
			response: &types.QueryGetPoolPairResponse{PoolPair: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetPoolPairRequest{
				AlphaDenom: msgs[1].AlphaDenom,
				BetaDenom:  msgs[1].BetaDenom,
			},
			response: &types.QueryGetPoolPairResponse{PoolPair: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetPoolPairRequest{
				AlphaDenom: strconv.Itoa(100000),
				BetaDenom:  strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.PoolPair(wctx, tc.request)
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

func TestPoolPairQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.SeaKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNPoolPair(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllPoolPairRequest {
		return &types.QueryAllPoolPairRequest{
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
			resp, err := keeper.PoolPairAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.PoolPair), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.PoolPair),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.PoolPairAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.PoolPair), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.PoolPair),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.PoolPairAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.PoolPair),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.PoolPairAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
