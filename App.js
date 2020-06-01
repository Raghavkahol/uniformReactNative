import AndForm from './AndForm.js';
import React, {Component} from 'react';
import {StyleSheet, Button, TextInput, View, Text, ScrollView, Picker, Image, ActivityIndicator} from 'react-native';
import { Formik } from 'formik';
import { RNCamera } from 'react-native-camera';
import SignaturePad from 'react-native-signature-pad';
import { withFormik } from 'formik';
import Loader from './Loader';

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

	takePicture = () =>
  {
  }

   _signaturePadError = (error) => {
    console.error(error);
  };

  _signaturePadChange = ({base64DataUrl}) => {
    console.log("Got new signature: " + base64DataUrl);
  };

   


ShowAlertWithDelay=()=>{
    setTimeout(function(){
      alert('Guest Data Updated')
    }, 1000);
  }

  render() {
    return (
      <View style={styles.appContainer}>
       <View style={styles.container}>
				<Formik
				initialValues={{name: '', phoneNo: '', nationality: '', age: '', idProof: '', frontImage: '', backImage: '', tripPurpose: '', comingFrom: ''
					, nextCity:'', sign:'',}}
				onSubmit={(values) => {
          if(values.name == ""  || values.age == "" || values.nationality == "" || values.mobile == "" || values.idProof == ""
             || values.tripPurpose == "" || values.comingFrom == "" || values.nextCity == "") {
              alert("Please enter all details")
          } else {
             this.setState({
    loading: true
  });
      fetch('https://hms-api.oyorooms.com/hms_ms/api/v1/property_register/checkin?property_type=HOTEL&reference_type=BOOKING&reference_ids=156670089&version=30000242&imei=358240051111110&qid=5669', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'HTTPXOYOLANG': 'en',
    'hmaccesstoken' : 'czZwbzJqRHZwRkNkSlVzOnBOY01ydEFGMDdWQ0R3VTpwdmdkWXA3ZHF5X2pOR3hhZlVCMjpveW8wMDFAb3lvcHJvcGVydGllcy5jb206UHJvcGVydHlNYW5hZ2Vy',
  },
  body: JSON.stringify({
    "records" : [
              {
                "guestName": values.name,
              },
              ]

  }),
}).then((response) => response.json())
    .then((responseJson) => {

      alert('Guest Data Updated')
       setTimeout(() => {
    this.setState({
      loading: false,
    });
  }, 1000);
    })
    .catch((error) => {
      console.error(error);
    });
           
				}}}
				>
				{(props) => (
					<View >
					<View style={styles.bgColor}>
					<Text style={styles.toolbar}>Enter Guest Details</Text>
					<View style={styles.guestName}>
					<Text style={styles.guest}>Raghav</Text>
					</View>
					</View>
					<ScrollView>
          <Loader
          loading={this.state.loading} />
					<View style={styles.input}>
						 <Text style={styles.heading}>Personal Details</Text>
						<TextInput style={styles.items}
							placeholder='Name'
							onChangeText={props.handleChange('name')}
							value={props.values.name}
						/>
						<TextInput style={styles.items}
							placeholder='Phone'
							onChan geText={props.handleChange('mobile')}
							value={props.values.mobile}
						/>
						<TextInput style={styles.items}
							placeholder='Nationality'
							onChangeText={props.handleChange('nationality')}
							value={props.values.nationality}
						/>
						<TextInput style={styles.items}
							placeholder='Age'
							onChangeText={props.handleChange('age')}
							value={props.values.age}
						/>
						</View>
						<View style={styles.input}>
						 <Text style={styles.heading}>ID Proof</Text>
						<TextInput style={styles.items}
							placeholder='ID Proof'
							onChangeText={props.handleChange('idProof')}
							value={props.values.idProof}
						/>
						
						<View style={styles.image}
						>
        				<RNCamera
        				 onPress={ this.takePicture }
         				 style={{ flex: 1, alignItems: 'center' }}
          				ref={ref => {
           				 this.camera = ref
         				 }}
   
       					 />
     			 	</View>
  						<View style={styles.image}>
        				<RNCamera
        				 onPress={ this.takePicture }
         				 style={{ flex: 1, alignItems: 'center' }}
          				ref={ref => {
           				 this.camera = ref
         				 }}
   					 	/>
      					</View>
						</View>
						<View style={styles.input}>
						 <Text style={styles.heading}>Trip Details</Text>
						<TextInput style={styles.items}
							placeholder='Trip Purpose'
							onChangeText={props.handleChange('tripPurpose')}
							value={props.values.tripPurpose}
						/>
						<TextInput style={styles.items}
							placeholder='Coming From'
							onChangeText={props.handleChange('comingFrom')}
							value={props.values.comingFrom}
						/>
						<TextInput style={styles.items}
							placeholder='Next City'
							onChangeText={props.handleChange('nextCity')}
							value={props.values.nextCity}
						/>
						</View>
						<View style={styles.input}>
						 <Text style={styles.heading}>Guest Signature</Text>
					 <View style={styles.sign}>
          <SignaturePad onError={this._signaturePadError}
                        onChange={this._signaturePadChange}
                        style={styles.signPad}/>
      </View>
      
						</View>
             <View style={styles.button}>
            <Button  
              title='Submit' 
              color='white'
              onPress={props.handleSubmit}/>
            </View>
					</ScrollView>
					</View>
				)}
				</Formik>
			</View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    marginTop: 20,
    marginBottom: 10,
  },
   container: {
    flex: 1,
    backgroundColor: '#f3f5f7',
  },
  spinner: {
  	width: 100,
  },
  button: {
  	backgroundColor: 'green',
  	borderRadius: 6,
  	marginTop: 10,
  	marginRight: 20,
  	marginBottom: 75,
  	width: 150,
  	alignSelf: 'flex-end'
  },
  heading: {
  	fontSize: 20,
  	color: 'black',
  	margin: 10,
  },
  items: {
  	margin: 5,
  	fontSize: 15,
  	borderWidth: 1,
  	borderRadius: 6,
  	borderColor: '#ddd',
  	padding: 10,
  },
  input: {
  	borderWidth: 1,
  	borderColor: '#ddd',
  	backgroundColor: '#ffff',
  	padding: 10,
  	fontSize: 18,
  	marginLeft: 2,
  	marginRight: 2,
  	marginTop: 5,
  	marginBottom: 5,
  },
  guest: {
	backgroundColor: '#ffff',
	fontSize: 20,
	fontSize: 15,
	color: 'red',
	paddingStart: 5, 
  	borderRadius: 6,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D3D3D3',
    width: 300,
    height: 150,
    margin: 10,
  },
  toolbar: {
	backgroundColor: '#ffff',
	fontSize: 20,
	paddingStart: 20,
	paddingTop: 20,
	paddingBottom: 10,
	fontSize: 20,
  },
  guestName: {
  	backgroundColor: '#ffff',
  	 borderBottomWidth: 1,
  	 paddingBottom: 10,
  	 paddingStart: 5,
  	 width : 80,
  	 borderColor: 'red',
  },
  bgColor: {
  	backgroundColor: '#ffff'
  },
  sign: {
  	flex: 1,
  	width: 350,
  	height: 150,
  },
  signPad: {
  	flex: 1, 
  	backgroundColor: '#DCDCDC',
  },
});