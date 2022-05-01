package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreatePoolPair = "create_pool_pair"

var _ sdk.Msg = &MsgCreatePoolPair{}

func NewMsgCreatePoolPair(creator string, alphaDenom string, alphaAmount string, betaDenom string, betaAmount string, shareAmount string, swapFee string, exitFee string) *MsgCreatePoolPair {
	return &MsgCreatePoolPair{
		Creator:     creator,
		AlphaDenom:  alphaDenom,
		AlphaAmount: alphaAmount,
		BetaDenom:   betaDenom,
		BetaAmount:  betaAmount,
		ShareAmount: shareAmount,
		SwapFee:     swapFee,
		ExitFee:     exitFee,
	}
}

func (msg *MsgCreatePoolPair) Route() string {
	return RouterKey
}

func (msg *MsgCreatePoolPair) Type() string {
	return TypeMsgCreatePoolPair
}

func (msg *MsgCreatePoolPair) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreatePoolPair) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreatePoolPair) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
