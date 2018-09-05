import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './Header';
import Explorer from './Explorer';
import Window from './Window';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: {},
      data: [],
      pwd: []
    };
    this.changeSelected = this.changeSelected.bind(this);
    this.setData = this.setData.bind(this);
    this.setPwd = this.setPwd.bind(this);
    this.pushPwd = this.pushPwd.bind(this);
    this.popPwd = this.popPwd.bind(this);
  }

  componentWillMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://coffee-shop-d6741.firebaseapp.com/API/short.json')
      .then(res => res.json())
      .then(data => {
        this.setData(data);
      })
      .catch(() => console.log('Data Error'));
  }

  setData = data => {
    this.setState({ data });
  };

  setPwd = pwd => {
    console.log('SET ' + pwd);
    this.setState({ pwd });
  };

  pushPwd = pwd => {
    console.log('PSH ' + pwd);
    let mypwd = this.state.pwd;
    mypwd.push(pwd);
    this.setState({ pwd: mypwd });
  };

  popPwd = () => {
    let mypwd = this.state.pwd;
    let discard = mypwd.pop();
    let selected = { ...this.state.data };
    console.log('pwd', mypwd);
    for (var i in mypwd) {
      console.log('i', mypwd[i]);
      selected = selected[mypwd[i]];
    }
    this.setState({ pwd: mypwd, selected });
  };

  changeSelected = selected => {
    console.log(selected);
    this.setState({ selected });
  };

  render() {
    if (this.state.data.length == 0) return null;
    const helper = {
      pushPwd: this.pushPwd,
      popPwd: this.popPwd,
      setPwd: this.setPwd,
      setData: this.setData,
      data: this.state.data,
      pwd: this.state.pwd
    };
    return (
      <div className="App">
        <Header>File Manager</Header>
        <div className="app-body">
          <Explorer helper={helper} changeSelected={this.changeSelected} />
          <Window helper={helper} changeSelected={this.changeSelected} selected={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default App;
