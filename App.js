import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Image,Button } from 'react-native';
import axios from 'axios'
class App extends Component {
  state={
    nameone:'',
    nametwo:'',
    result:'',
    comment:''
  }
  getnameone=(text)=>{
    
    this.setState({nameone:text})
  }
  getnametwo=(text)=>{
    this.setState({nametwo:text})
  }
  async getresult(){
    console.log(this.state.nametwo)
    if(this.state.nameone.length<1 || this.state.nametwo<1){
      this.setState({result:"Invalid Input"})
    }
    else{
    var options = {
      method: 'GET',
      url: 'https://love-calculator.p.rapidapi.com/getPercentage',
      params: {fname: this.state.nameone, sname: this.state.nametwo},
      headers: {
        'x-rapidapi-key': 'bbe7de4628msha5d21ab3d3c871fp14f180jsna91411cce491',
        'x-rapidapi-host': 'love-calculator.p.rapidapi.com'
      }
    };
    var self=this
    axios.request(options).then(function (response) {
      self.setState({result:"Percentage "+response.data.percentage,comment:response.data.result,nameone:"",nametwo:""})
      console.log(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }
}
  render(){
  return (
    <View style={styles.container}>
      <Image  source={{ uri: 'https://seeklogo.com/images/F/facebook-love-logo-0E36A58F96-seeklogo.com.png' }}
  style={{ width: 80, height: 80 }}></Image>
      <TextInput onChangeText={this.getnameone} value={this.state.nameone} placeholder="Enter Person 1 Name" style={styles.input}/>
      <TextInput onChangeText={this.getnametwo} value={this.state.nametwo} placeholder="Enter Person 2 Name" style={styles.input}/>
      <View style={styles.btn}>
      <Button color="#ED5168" borderRadius="40" accessibilityLabel="Tap to Calculate" onPress={()=>this.getresult()}  title="Calculate"/>
      <Text style={styles.text}>{this.state.result}</Text>
      <Text style={styles.text}>{this.state.comment}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderStyle:'solid',
    borderWidth:2,
    borderRadius:10,
    borderColor:'black',
    width:300,
    textAlign:'center',
    marginTop:20
  },
  btn:{
    marginTop:20,
  
    width:120,
    height:130
  },
  text:{
   
    textAlign:'center',
    
    marginTop:20,
  }
});
