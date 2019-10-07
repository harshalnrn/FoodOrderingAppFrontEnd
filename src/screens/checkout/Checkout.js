import React, { Component } from "react";
import "./Checkout.css";
import "../checkout/Checkout.css";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import GridList from "@material-ui/core/GridList";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import GridListTile from '@material-ui/core/GridListTile';
import AppBar from '@material-ui/core/AppBar';
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Select from "@material-ui/core/Select";

//injecting below custom props, to one of the properties of component.
const styles = theme => ({
  root: {
    width: "100%",
    //flexGrow: 1,

    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button1: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(3)
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width:"20%",
  },
  cardTitle: {
    fontSize: "14px",
    width: "90%"
  }

});


//---------------------------------------------------------------------------------------------------------------------------------




class Checkout extends Component {

  constructor() {
    super();

    //declare and initialize state variables here
    this.state = {
      tabList: ["Delivery", "Payment"],
      addressIconCounter:0,
      paymentMediums:[],
      value: 0,
      activeStep: 0,
      finishSignal: 0,
      flatNo:"",
      flatNoRequired:"noDisplay",
      locality:"",
      localityRequired:"noDisplay",
      city:"",
      cityRequired:"noDisplay",
      stateRequired:"noDisplay",
      pinCode:"",
      pinCodeRequired:"noDisplay",
      pinCodeInvalid:"noDisplay",
      addressResponse:[],                 
      states:[],
      stateName:"",
      stateUuid:""

    };
  }



  
  //---------------manage event handlers and other functions here---------------------------------------------------------------

handlePlaceOrder=event=>{
  let requestData=JSON.stringify({
    "address_id": "string",
    "bill": 0,
    "coupon_id": "string",
    "discount": 0,
    "item_quantities": [
      {
        "item_id": "string",
        "price": 0,
        "quantity": 0
      }
    ],
    "payment_id": "string",
    "restaurant_id": "string"
  }) 

  
  let xhr4=new XMLHttpRequest();
let that=this;
  xhr4.addEventListener("readystatechange",function(){
    if (this.readyState===4){
    
     console.log(this.responseText); //parsing string to json object
     
    }
        });
        
        //have base url within props and use it as this.props.baseUrl
        xhr4.open("POST","http://localhost:8000/api/order");
       xhr4.setRequestHeader("Content-Type","application/json");
      xhr4.setRequestHeader("Cache-Control", "no-cache");
      xhr4.setRequestHeader("authorization","database_accesstoken2");
      console.log(requestData);
        xhr4.send(requestData);
  

}

  handleStateSelect =event=>{
this.setState({
  stateUuid:event.target.value
})

  }

  onChangeFlatNo =event=>{
this.setState({
flatNo:event.target.value
})
  }

  onChangeLocality =event=>{
this.setState({
  locality:event.target.value
})

  }

  onChangeCity =event=>{
    this.setState({
      city:event.target.value
    })

  }

  onChangePinCode =event=>{
    this.setState({
      pinCode:event.target.value
    })

  }


  tabChangeHandler = (event, value) => {
    this.setState({ value: value });
  };

  //
  handledNextStep = event => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  //
  handleFinish = event => {
    this.setState({
      finishSignal: this.state.finishSignal + 1
    });
  };
  //
  handleChangeAfterFinish = event => {
    this.setState({
      activeStep: 0,
      finishSignal: 0
    });
  };

  handleGridCheck = e => {
    {
    this.state.addressIconCounter===0 ?
    (this.setState({
      addressIconCounter:(this.state.addressIconCounter + 1)}))
      :
(this.setState({
  addressIconCounter:(this.state.addressIconCounter - 1)}))

}

console.log(this.state.addressIconCounter);

    {
      this.state.addressIconCounter===0 ?
   ( e.target.style.color = "green") 
   :
   (e.target.style.color="grey")
    }

  };

  saveAddressHandler = event => {

    {
this.state.flatNo==="" ? (this.setState({
 flatNoRequired:"display" 
})):(this.setState({
  flatNoRequired:"noDisplay" 
 }))
    }

    {
      this.state.locality==="" ?(this.setState({
       localityRequired:"display" 
      })):(this.setState({
        localityRequired:"noDisplay" 
       }))
          }

          {
            this.state.city==="" ?(this.setState({
             cityRequired:"display" 
            })):(this.setState({
              cityRequired:"noDisplay" 
             }))
                }

                { 
                  this.state.stateUuid==="" ?(this.setState({
                   stateRequired:"display" 
                  })):(this.setState({
                    stateRequired:"noDisplay" 
                   }))
                      }



                      {
                        this.state.pinCode==="" ? (this.setState({
                         pinCodeRequired:"display" 
                        })) :

                        this.state.pinCode.length!=6 ?
                        (this.setState({
                          pinCodeInvalid:"display" 
                         })) : 
                         (this.setState({
                          pinCodeRequired:"noDisplay",
                          pinCodeInvalid:"noDisplay"
                         }))




                          let requestData=JSON.stringify({
                          "city": this.state.city,
                          "flat_building_name":this.state.flatNo ,
                          "locality":this.state.locality ,
                          "pincode": this.state.pinCode,
                          "state_uuid": this.state.stateUuid
                        }) 
                    
                        
                        let xhr3=new XMLHttpRequest();
let that=this;
                        xhr3.addEventListener("readystatechange",function(){
                          if (this.readyState===4){
                          
                           console.log(this.responseText); //parsing string to json object
                           
                          }
                              });
                              
                              //have base url within props and use it as this.props.baseUrl
                              xhr3.open("POST","http://localhost:8000/api/address");
                             xhr3.setRequestHeader("Content-Type","application/json");
                            xhr3.setRequestHeader("Cache-Control", "no-cache");
                            xhr3.setRequestHeader("authorization","database_accesstoken2");
                            console.log(requestData);
                              xhr3.send(requestData);
                    



                          }


         

  }

  componentWillMount(){
    let requestData=null; //request body
    let xhr=new XMLHttpRequest();
    let xhr1=new XMLHttpRequest();
    let xhr2=new XMLHttpRequest();
    let that=this;
    
    xhr2.addEventListener("readystatechange",function(){
      if (this.readyState===4){
      
       console.log(JSON.parse(this.responseText)); //parsing string to json object
       that.setState({
        paymentMediums:JSON.parse(this.responseText).paymentMethods
      }); 
      }
          });
          
          //have base url within props and use it as this.props.baseUrl
          xhr2.open("GET","http://localhost:8000/api/payment");
         xhr2.setRequestHeader("Accept","application/json;charset=UTF-8");
        xhr2.setRequestHeader("Cache-Control", "no-cache");
        
          xhr2.send(requestData);













    xhr1.addEventListener("readystatechange",function(){
      if (this.readyState===4){
      
       console.log(JSON.parse(this.responseText)); //parsing string to json object
       that.setState({
        states:JSON.parse(this.responseText).states
      }); 
      }
          });
          
          //have base url within props and use it as this.props.baseUrl
          xhr1.open("GET","http://localhost:8000/api/states");
         xhr1.setRequestHeader("Accept","application/json;charset=UTF-8");
        xhr1.setRequestHeader("Cache-Control", "no-cache");
          xhr1.send(requestData);





    
    xhr.addEventListener("readystatechange",function(){
if (this.readyState===4){

 console.log(JSON.parse(this.responseText)); //parsing string to json object
 that.setState({
  addressResponse:JSON.parse(this.responseText).addresses   // we retreive list frmo json object
}); 
}
    });
    
    //have base url within props and use it as this.props.baseUrl
    xhr.open("GET","http://localhost:8000/api/address/customer");
   xhr.setRequestHeader("Accept","application/json;charset=UTF-8");
    xhr.setRequestHeader("authorization","database_accesstoken2");
  xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(requestData);
    
    
                      }

//--------------------------------------------------------------------------------------------------------------------------




  render() {  
    const { classes } = this.props;

    return (
      <div>
        <header>header component to be reused here</header>
        <br />

        <GridList className={classes.gridList} cols={2}>
          <GridListTile style={{ width: "70%", height: "100%" }}>
          

            <Stepper activeStep={this.state.activeStep} orientation="vertical">
              {this.state.tabList.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>

                  {this.state.activeStep === 0 && label === "Delivery" ? (
                    <div style={{ marginLeft: "30px" }}>
                      <AppBar position="static">
                        <Tabs
                          value={this.state.value}
                          onChange={this.tabChangeHandler}
                        >
                          <Tab label="EXISTING ADDRESS" />
                          <Tab label="NEW ADDRESS" />
                        </Tabs>
                      </AppBar>
                    </div>
                  ) : null}
                  <StepContent>
                   
                    {this.state.activeStep === 0 &&
                    label === "Delivery" &&
                    this.state.value === 0 ? (
                      <div>
                        <GridList className={classes.gridList} cols={3}>
                          {this.state.addressResponse.map(add => (
                            <GridListTile key={add.id}>
                              <h>{add.flat_building_name} ,<br/> {add.locality} ,<br/> {add.city} ,<br/> {add.state.state_name} ,<br/> {add.pincode}</h>
                              <IconButton>
                                <CheckCircleIcon value={add.id}
                                  onClick={this.handleGridCheck}
                                />
                              </IconButton>
                            </GridListTile>
                          ))}
                        </GridList>
                        <div className={classes.actionsContainer}>
                          <div>
                            <Button
                              variant="contained"
                              disabled
                              color="secondary"
                              className={classes.button}
                            >
                              BACK
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              onClick={this.handledNextStep}
                            >
                              NEXT
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {this.state.activeStep === 1 ? (
                      <div>
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}>
                          <FormLabel component="legend">
                            Select mode of Payment
                          </FormLabel>
                          {
                            this.state.paymentMediums.map(payment =>(    
                          <RadioGroup
                            aria-label=""
                            name="" /* value={value} */ /* onChange={handleChange} */
                          >
                            <FormControlLabel
                              value={payment.payment_name}
                              control={<Radio />}
                              label={payment.payment_name}
                            />                      
                          </RadioGroup>
                            ))
                          }
                        </FormControl>


                        <div>
                          <Button
                            className={classes.button}
                            onClick={this.handleChangeAfterFinish}
                          >
                            BACK
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleFinish}
                          >
                            FINISH
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    {/* form for new address */}

                    {this.state.activeStep === 0 && this.state.value === 1 ? (
                      <div>
                      <form className={classes.container} >
                        <FormControl >
                          <TextField label="Flat / Building No" onChange={this.onChangeFlatNo}/>
                          <FormHelperText className={this.state.flatNoRequired}><span style={{color:"red"}}>required</span></FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl>
                          <TextField label="Locality" onChange={this.onChangeLocality} />
                          <FormHelperText className={this.state.localityRequired}><span style={{color:"red"}}>required</span></FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl>
                          <TextField label="City"  onChange={this.onChangeCity}/>
                          <FormHelperText className={this.state.cityRequired}><span style={{color:"red"}}>required</span></FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl>
                          <InputLabel htmlFor="">State</InputLabel>
                          <Select value={this.state.stateUuid} onChange={this.handleStateSelect}  >
                            {this.state.states.map(state => (
                              <MenuItem value={state.id}>{state.state_name}</MenuItem>
                            ))}
                          </Select>
                          <FormHelperText className={this.state.stateRequired}><span style={{color:"red"}}>required</span></FormHelperText>
                        </FormControl>

                        <br />

                        <FormControl>
                          <TextField label="Pincode" onChange={this.onChangePinCode} />
                          <FormHelperText className={this.state.pinCodeRequired}><span style={{color:"red"}}>required</span></FormHelperText>
                          <FormHelperText className={this.state.pinCodeInvalid}><span style={{color:"red"}}>Pincode must contain only numbers and must be 6 digits long</span></FormHelperText>
                        </FormControl>
<br/>
                        <FormControl>
                          <Button variant="contained" color="secondary" style={{width:"80%"}}onClick={this.saveAddressHandler} >SAVE ADDRESS</Button>
                        </FormControl>

                        </form>
                      









                          <Button
                          disabled
                            className={classes.button}
                            onClick={this.handleChangeAfterFinish}
                          >
                            BACK
                          </Button>

                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleFinish}
                          >
                            FINISH
                          </Button>
                        
                       
                        </div>
                      
                    ) : null}


                  </StepContent>
                  }
                </Step>
              ))}
            </Stepper>

            {this.state.finishSignal == 1 ? (
              <Typography>
                View the summary & place your oder now!
                <br />
                <Button onClick={this.handleChangeAfterFinish}>CHANGE</Button>
              </Typography>
            ) : null}
          </GridListTile>

          <GridListTile style={{ width: "30%", height: "100%" }}>
            <Card className={classes.cardTitle}>
              <CardContent>
                <br/>
                <Typography style={{ fontSize: "20px", color: "black" }}>
                  Summary
                </Typography>

                <br />

                <Typography
                  className={classes.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                copy paste design of rest from details, and use props on routing
                </Typography>

                <br />
                <Divider />
                <br />

                <Typography>Net Amount : total amount from details</Typography>

                <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button1} onClick={this.handlePlaceOrder}
                >
                  PLACE ORDER
                </Button>
              </CardContent>
            </Card>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}
export default withStyles(styles)(Checkout);
