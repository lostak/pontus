package keeper

import (
	"github.com/VelaChain/pontus/x/sea/types"
)

var _ types.QueryServer = Keeper{}
