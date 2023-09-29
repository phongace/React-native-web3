import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import Web3 from 'web3';
import '@ethersproject/shims';
import {ethers, WebSocketProvider} from 'ethers';

const address = '0xEbAcAF6159d6BA060833988a3985b02883066470';
const url = 'https://bsc-testnet.publicnode.com';
const privateKey =
  '37a1a52faa43e8555df1352d834318166ad444fcb4c02613f8b6c6099af4d6f7';

const web3 = new Web3(new Web3.providers.HttpProvider(url));

const InteractWithWeb3 = () => {
  const [balance, setBalance] = useState(null);
  const [value, setValue] = useState('');

  const handleSend = async () => {
    const provider = new WebSocketProvider('wss://bsc-testnet.publicnode.com');
    const toAddress = '0xE4b1A769e97D489D43D27f80D6D9D27C48667f8b';

    const wallet = new ethers.Wallet(privateKey, provider);
    const abc = await provider.getBalance(address);
    console.log(abc);
    const tx = {
      to: toAddress,
      value: ethers.parseUnits(value, 'ether'),
    };

    try {
      wallet.sendTransaction(tx).then(transaction => {
        console.log(transaction);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      let res = await web3.eth.getBalance(address);
      res = web3.utils.fromWei(res, 'ether');
      setBalance(res);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Image source={require('./images/astar.png')} style={styles.img} />
      <View style={styles.informationCon}>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.flexCenter}>
          <Text>Balance</Text>
          <Text>{balance}</Text>
        </View>

        <View style={[styles.flexCenter, {marginTop: 20}]}>
          <Pressable style={styles.btn} onPress={handleSend}>
            <Text>Send</Text>
          </Pressable>
          <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '80%',
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  informationCon: {
    paddingHorizontal: 20,
    marginTop: 20,
    height: 2000,
  },
  address: {
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 0.2,
    fontWeight: '500',
    marginBottom: 20,
    color: 'red',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 12,
    backgroundColor: 'pink',
    borderRadius: 16,
    width: '20%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    width: '40%',
    height: 40,
  },
});

export default InteractWithWeb3;
