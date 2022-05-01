package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// PoolPairKeyPrefix is the prefix to retrieve all PoolPair
	PoolPairKeyPrefix = "PoolPair/value/"
)

// PoolPairKey returns the store key to retrieve a PoolPair from the index fields
func PoolPairKey(
	alphaDenom string,
	betaDenom string,
) []byte {
	var key []byte

	alphaDenomBytes := []byte(alphaDenom)
	key = append(key, alphaDenomBytes...)
	key = append(key, []byte("/")...)

	betaDenomBytes := []byte(betaDenom)
	key = append(key, betaDenomBytes...)
	key = append(key, []byte("/")...)

	return key
}
