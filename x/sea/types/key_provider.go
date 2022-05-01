package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// ProviderKeyPrefix is the prefix to retrieve all Provider
	ProviderKeyPrefix = "Provider/value/"
)

// ProviderKey returns the store key to retrieve a Provider from the index fields
func ProviderKey(
	poolName string,
	address string,
) []byte {
	var key []byte

	poolNameBytes := []byte(poolName)
	key = append(key, poolNameBytes...)
	key = append(key, []byte("/")...)

	addressBytes := []byte(address)
	key = append(key, addressBytes...)
	key = append(key, []byte("/")...)

	return key
}
