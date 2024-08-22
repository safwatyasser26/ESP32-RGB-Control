import { View, Text, TextInput, StyleSheet } from 'react-native';
import  WheelColorPicker  from 'react-native-wheel-color-picker'; // Install: npm install react-native-wheel-color-picker
import {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';

const LedControl = () => {
    const [server, setServer] = useState('');
    const [selectedColor, setSelectedColor] = useState('#000000'); // Initial black
    const [redValue, setRedValue] = useState(0);
    const [greenValue, setGreenValue] = useState(0);
    const [blueValue, setBlueValue] = useState(0);
    const [serverInput, setServerInput] = useState('');
    
    const handleColorChange = (color) => {
      const rgb = color.substring(1).match(/.{2}/g).map(x => parseInt(x, 16));
      setSelectedColor(color);
      setRedValue(rgb[0]);
      setGreenValue(rgb[1]);
      setBlueValue(rgb[2]);
      
    };
  
    
    const handleLedColor = async () => {
      try {
        const response = await fetch(`http://${server}/color=${redValue},${greenValue},${blueValue}`);
        const data = await response.text();
        console.log('LED control response:', data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    
  
    return (
      <View style={styles.container}>
        <Text style={[styles.text ,{fontSize: 60, letterSpacing: 5, fontWeight: 'bold'}]}><Text style={{color: 'red'}}>R</Text><Text style={{color: 'green'}}>G</Text><Text style={{color: 'blue'}}>B</Text> Controller</Text>
        
        <TextInput
          placeholder='Enter the server ip address'
          onChangeText={s => {
            setServerInput(s);
            console.log(serverInput);
          
          }

          
          }
          className="server"
          style={{ padding: 20, backgroundColor: '#eee', width: '80%', textAlign: 'center', marginBottom: 20, borderRadius: 10}}
        /> 
        <Button  textColor='#eee' buttonColor="#34013f" onPress={() => {setServer(serverInput)}} style={{width: '50%', padding: 5, marginBottom: 10}}>Connect</Button>
        <Text>Connected to server {server}</Text>
        {/* <View style={styles.buttonContainer}>
            <Button style={{width: '25%'}} buttonColor="#ff0000" textColor="#ffffff" onPress={() => {handleColorChange('#ff0000'); handleLedColor();}}>Red</Button>
            <Button style={{width: '25%'}} buttonColor="#00ff00" textColor="#ffffff" onPress={() => {handleColorChange('#00ff00'); handleLedColor();}}>Green</Button>
            <Button style={{width: '25%'}} buttonColor="#0000ff" textColor="#ffffff"  onPress={() => {handleColorChange('#0000ff'); handleLedColor();}}>Blue</Button>
            <Button style={{width: '25%'}} buttonColor="#00ffff" textColor="#ffffff" onPress={() => {handleColorChange('#00ffff'); handleLedColor();}}>Cyan</Button>
            <Button style={{width: '25%'}} buttonColor="#ffff00" textColor="#000" onPress={() => {handleColorChange('#ffff00'); handleLedColor();}}>Yellow</Button>
            <Button style={{width: '25%'}}buttonColor="#ff00ff" textColor="#ffffff"  onPress={() => {handleColorChange('#ff00ff'); handleLedColor();}}>Magenta</Button>
            <Button style={{width: '25%'}} buttonColor="#ffffff" textColor="#000" onPress={() => {handleColorChange('#ffffff'); handleLedColor();}}>White</Button>
            <Button style={{width: '25%'}}buttonColor="#000000" textColor="#ffffff" onPress={() => {handleColorChange('#000000'); handleLedColor();}}>Black</Button>
        </View> */}
        
        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center', marginTop: 10}}>
        <Text style={{marginLeft: 10, marginTop: 10}}>Red: </Text>
        <TextInput style={{ padding: 10, borderRadius: 10, backgroundColor: '#eee'}} placeholder="red" value={redValue} onChangeText={(e) => setRedValue(e)}/>

        <Text style={{marginLeft: 10, marginTop: 10}}>Green: </Text>
        <TextInput style={{ padding: 10,  borderRadius: 10, backgroundColor: '#eee'}} placeholder="green" value={greenValue} onChangeText={(e) => setGreenValue(e)}/>

        <Text style={{marginLeft: 10, marginTop: 10}}>Blue: </Text>
        <TextInput style={{ padding: 10,  borderRadius: 10, backgroundColor: '#eee'}} placeholder="blue" value={blueValue} onChangeText={(e) => setBlueValue(e)}/>
        </View>
        <WheelColorPicker
          sliderStyle={{ width: 150, height: 150 }}
          initialColor={selectedColor}
          palette={['#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ffff00', '#ff00ff', '#ffffff', '#000000', '#ed7014']}
          thumbSize={20}
          
          useNativeDriver={false}
          useNativeLayout={false}
          onColorChange={handleColorChange}
          style={{ flex: 1, width:  500, height: 500 }}
        />
        
        
        
        <Text style={styles.text}>Red Value:{redValue.toString()}, Green Value: {greenValue.toString()}, Blue Value: {blueValue.toString()}</Text>
        <Button textColor='#ffffff' buttonColor='#34013f' title="Set Color" onPress={handleLedColor} style={{width: '50%', padding: 5, marginBottom: 20}}>set Color</Button>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#FAF4F0',
      height: '100%'
    },
    
    text: {
      marginTop: 50,
      marginBottom: 5,
    }, 
    buttonContainer: {
        display: 'grid',
        padding: 10,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly', // Distribute buttons evenly
        marginBottom: 20, // Add margin below the buttons
        backgroundColor: '#eee',
      },
     
  });
  
export default LedControl;




