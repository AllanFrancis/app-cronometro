import React,{useState} from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const crono = require('./src/assets/images/crono.png');

const styleButton = 'justify-center items-center bg-white h-24 w-24 rounded-full';
const styleButtonText = 'text-slate-800 font-bold text-base';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [number, setNumber] = useState('00:00:00');
  const [buttonText, setButtonText] = useState('Vai');
  const [lastTimer, setLastTimer] = useState(null);

  function goTimer() {
    if(timer !== null) {
      //aqui vai parar o timer
      clearInterval(timer);
      timer = null;
      setButtonText('Vai');
      setLastTimer(number)
    } else {
      setButtonText('Parar');
      //Começar a girar o timer
      timer = setInterval(()=>{
        ss++;
        if(ss == 60) {
          ss = 1;
          mm++; 
        }
        if(mm == 60) {
          mm = 0;
          hh++; 
        }

        let format = 
        (hh < 10?'0'+hh:hh) +":"+ 
        (mm < 10?'0'+mm:mm) +":"+ 
        (ss < 10?'0'+ss:ss);
        setNumber(format);
      },1000);
    }

  }

  function clearTimer() {
    setButtonText('Vai');

    if (timer !==null) {
      //Parar o timer
      clearInterval(timer);
      timer = null;
    }
    setLastTimer(null);
    setNumber('00:00:00');
    hh = 0;
    mm = 0; 
    ss = 0; 
  }

  return (
    <View className='flex-1 items-center justify-center bg-slate-800' >
      <Image source={crono} />
      <Text className='-mt-36 text-5xl font-bold text-white'> {number} </Text>

      <View className='flex-row mt-36 w-full justify-around'>
        <TouchableOpacity className='justify-center items-center bg-green-500 h-24 w-24 rounded-full' onPress={goTimer}>
          <Text className={styleButtonText} >{buttonText}</Text> 
        </TouchableOpacity>
        
        <TouchableOpacity className={'justify-center items-center bg-white h-24 w-24 rounded-full'} onPress={clearTimer}>
          <Text className={styleButtonText} >Zerar</Text> 
        </TouchableOpacity>
      </View>
      <View className='mt-10'>
        <Text className='text-lg text-white italic'> {lastTimer?lastTimer:''} </Text>
      </View>
    </View>
  );
}
